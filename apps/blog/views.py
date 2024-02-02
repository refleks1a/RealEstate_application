import logging

import django_filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Post, PostViews
from .serializers import PostSerializer, PostCreateSerializer, PostViewSerializer
from .pagination import PostPagination
from .exceptions import PostNotFound

from ..profiles.models import Profile


logger = logging.getLogger(__name__)


class PropertyFilter(django_filters.FilterSet):
    views__gt = django_filters.NumberFilter(
        field_name="views", lookup_expr="gt",
    )
    views__lt = django_filters.NumberFilter(
        field_name="views", lookup_expr="lt",
    )
    
    class Meta:
        model = Post
        fields = [
            "views",
        ]


class PostsListAPIView(generics.ListAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all().order_by("-created_at")
    pagination_class = PostPagination

    filter_backends = [
        DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter,
    ]
    filterset_class = PropertyFilter

    search_fields = ["title", "subtitle", "body", "reference_code"]
    ordering_fields = ["created_at"]


class PostViewsAPIView(generics.ListAPIView):
    serializer_class = PostViewSerializer
    queryset = PostViews.objects.all()


class PostDetailsAPIView(APIView):

    def get(self, request, id):
        post = Post.objects.get(id=id)

        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            ip = x_forwarded_for.split(",")[0]
        else:
            ip = request.META.get("REMOTE_ADDR") 

        if not PostViews.objects.filter(post=post, ip=ip).exists():
            PostViews.objects.create(post=post,ip=ip)

            post.views += 1
            post.save()

        serializer = PostSerializer(post, context={"request": request})

        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["PUT"])
@permission_classes([permissions.IsAuthenticated])
def update_post_api_view(request, id):
    try:
        post = Post.objects.get(id=id)  
    except Post.DoesNotExist:
        raise PostNotFound
        
    user = request.user
    if post.author.user != user:
        return Response(
            {"error":"You can't update/edit a post that is nit yours!"},
            status=status.HTTP_403_FORBIDDEN,
        )    

    if request.method == "PUT":
        data = request.data
        serializer = PostSerializer(post, data, many=False)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)
    

@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def create_post_api_view(request):
    user = request.user
    data = request.data
    data._mutable = True
    data["author"] = Profile.objects.get(user=user).pkid
    data._mutable = False
    serializer = PostCreateSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        logger.info(f"Post {serializer.data.get('title')} created by {user.username}")

        return Response(serializer.data)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([permissions.IsAuthenticated])
def delete_post_api_view(request, id):
    try:
        post = Post.objects.get(id=id)  
    except Post.DoesNotExist:
        raise PostNotFound
    
    user = request.user
    if post.author.user != user:
        return Response(
            {"error":"You can't update/edit a post that is not yours!"},
            status=status.HTTP_403_FORBIDDEN,
        ) 
    if request.method == "DELETE":
        delete_operation = post.delete()
        data = {}
        if delete_operation:
            data["deletion"] = "Deletion was successful!"
        else:
            data["deletion"] = "Deletion failed!"

        return Response(data=data)  
