import logging

import django_filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from .exceptions import PropertyNotFound
from .models import Property, PropertyViews
from .pagination import PropertyPagination
from .serializers import (PropertyCreateSerializer, PropertySerializer,
                          PropertyViewSerializer)

from drf_spectacular.utils import extend_schema, OpenApiParameter

import redis

logger = logging.getLogger(__name__)
cache = redis.Redis(host='redis', port=6379, db=0)

class PropertyFilter(django_filters.FilterSet):
    advert_type = django_filters.CharFilter(
        field_name="advert_type", lookup_expr="iexact",
    )

    property_type = django_filters.CharFilter(
        field_name="property_type", lookup_expr="iexact",
    )

    price = django_filters.NumberFilter()
    price__gt = django_filters.NumberFilter(
        field_name="price", lookup_expr="gt",
    )
    price__lt = django_filters.NumberFilter(
        field_name="price", lookup_expr="lt",
    )
    
    class Meta:
        model = Property
        fields = [
            "advert_type", "property_type", "price"
        ]


@extend_schema(
    summary="All properties",
    description="""
    Get list of all properties, ordered by the date of creation.
    """,
    request=PropertySerializer,
    parameters=[
        OpenApiParameter(
            name="advert_type",
            description="The tpe of the advert (sell, rent, auction)",
            location=OpenApiParameter.QUERY,
            required=False,
            type=str,
        ),
        OpenApiParameter(
            name="property_type",
            description="The tpe of the property (house, flat, other)",
            location=OpenApiParameter.QUERY,
            required=False,
            type=str,
        ),
        OpenApiParameter(
            name="price",
            description="The price of the property",
            location=OpenApiParameter.QUERY,
            required=False,
            type=float,
        ),
        OpenApiParameter(
            name="price__gt",
            description="Properties with prices greater than:",
            location=OpenApiParameter.QUERY,
            required=False,
            type=float,
        ),
        OpenApiParameter(
            name="price__lt",
            description="Properties with prices less than:",
            location=OpenApiParameter.QUERY,
            required=False,
            type=float,
        ),

    ]
)
class ListAllPropertiesAPIView(generics.ListAPIView):
    serializer_class = PropertySerializer
    queryset = Property.objects.all().order_by("-created_at")
    pagination_class = PropertyPagination
    
    filter_backends = [
        DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter,
    ]
    filterset_class = PropertyFilter

    search_fields = ["country", "city"]
    ordering_fields = ["created_at"]


@extend_schema(
    summary="Agent's properties",
    description="""
    Get list of agent's properties, ordered by the date of creation.
    """,
    request=PropertySerializer
)
class ListAgentsPropertyAPIView(generics.ListAPIView):
    serializer_class = PropertySerializer
    pagination_class = PropertyPagination
    filter_backends = [
        DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter,
    ]
    filterset_class = PropertyFilter
    search_fields = ["country", "city"]
    ordering_fields = ["created_at"]

    def get_queryset(self):
        user = self.request.user
        queryset = Property.objects.filter(user=user).order_by("-created_at")
        
        return queryset
    

class PropertyViewsAPIView(generics.ListAPIView):
    serializer_class = PropertyViewSerializer
    queryset = PropertyViews.objects.all()


@extend_schema(
    summary="Property details",
    description="""
    Get the details about the property.
    """,
    request=PropertySerializer,
    responses={
        status.HTTP_200_OK: PropertySerializer,
    },
)
class PropertyDetailAPIView(APIView):

    def get(self, request, slug):
        property = Property.objects.get(slug=slug)

        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            ip = x_forwarded_for.split(",")[0]
        else:
            ip = request.META.get("REMOTE_ADDR") 

        if not PropertyViews.objects.filter(property=property, ip=ip).exists():
            PropertyViews.objects.create(property=property,ip=ip)

            property.views += 1
            property.save()

        serializer = PropertySerializer(property, context={"request": request})

        return Response(serializer.data, status=status.HTTP_200_OK)


@extend_schema(
    summary="Update the details of your property.",
    description="""
    Update the details about the property that belongs to you.
    """,
    request=PropertyCreateSerializer,
    responses={
        status.HTTP_200_OK: PropertySerializer,
    },
)
@api_view(["PUT"])
@permission_classes([permissions.IsAuthenticated])
def update_property_api_view(request, slug):
    try:
        property = Property.objects.get(slug=slug)  
    except Property.DoesNotExist:
        raise PropertyNotFound
        
    user = request.user
    if property.user != user:
        return Response(
            {"error":"You can't update/edit a property that is nit yours!"},
            status=status.HTTP_403_FORBIDDEN,
        )    

    if request.method == "PUT":
        data = request.data
        serializer = PropertySerializer(property, data, many=False)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)
    

@extend_schema(
    summary="Create a property",
    description="""
    Create a property.
    """,
    request=PropertyCreateSerializer,
    responses={
        status.HTTP_200_OK: PropertyCreateSerializer,
    },
)
@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def create_property_api_view(request):
    user = request.user
    data = request.data
    data._mutable = True
    data["user"] = request.user.pkid
    data._mutable = False
    serializer = PropertyCreateSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        logger.info(f"property {serializer.data.get('title')} created by {user.username}")

        return Response(serializer.data)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    summary="Delete a property",
    description="""
    Delete a property, that belongs to you.
    """,
    responses={
        status.HTTP_200_OK: {
            "deletion": "Deletion was successful!"
        },
    },
)
@api_view(["DELETE"])
@permission_classes([permissions.IsAuthenticated])
def delete_property_api_view(request, slug):
    try:
        property = Property.objects.get(slug=slug)  
    except Property.DoesNotExist:
        raise PropertyNotFound
    
    user = request.user
    if property.user != user:
        return Response(
            {"error":"You can't update/edit a property that is nit yours!"},
            status=status.HTTP_403_FORBIDDEN,
        ) 
    if request.method == "DELETE":
        delete_operation = property.delete()
        data = {}
        if delete_operation:
            data["deletion"] = "Deletion was successful!"
        else:
            data["deletion"] = "Deletion failed!"

        return Response(data=data)  
    

@api_view(["POST"])
def uploadPropertyImage(request):
    data = request.data
    property_id = data["property_id"]

    property = Property.objects.get(id=property_id)
    property.cover_photo = request.FILES.get("cover_photo")
    property.photo1 = request.FILES.get("photo1")
    property.photo2 = request.FILES.get("photo2")
    property.photo3 = request.FILES.get("photo3")
    property.photo4 = request.FILES.get("photo4")

    property.save()

    return Response("Image(s) uploaded")



@extend_schema(
    summary="Search a property",
    description="""
    Search a property, based on price, advert type, property type, bedrooms, bathrooms, catch phrase.
    """,
    responses={
        status.HTTP_200_OK: PropertyCreateSerializer,
    },
)
class PropertySearchAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = PropertyCreateSerializer

    def post(self, request):
        queryset = Property.objects.filter(published_status=True)
        data = self.request.data
        
        try:
            if data["advert_type"] :
                advert_type = data["advert_type"]
                queryset = queryset.filter(advert_type__iexact=advert_type)
        except KeyError:  
            pass  
        
        try:
            if data["property_type"]:
                property_type = data["property_type"]
                queryset = queryset.filter(property_type__iexact=property_type)
        except KeyError:
            pass

        try:
            if data["price"]:
                price = data["price"]
            if price == "$0+":
                price = 0
            elif price == "$50000+":
                price = 50000  
            elif price == "$100000+":
                price = 100000 
            elif price == "$200000+":
                price = 200000  
            elif price == "$400000+":
                price = 400000 
            elif price == "$600000+":
                price = 600000               
            elif price == "any":
                price = -1

            if price != -1:
                queryset = queryset.filter(price__gte=price)   
        except KeyError:
            pass
            
        try:
            if data["bedrooms"]:
                bedrooms = data["bedrooms"]     
                if bedrooms == "0+":
                    bedrooms = 0
                elif bedrooms == "1+":
                    bedrooms = 1
                elif bedrooms == "2+":
                    bedrooms = 2
                elif bedrooms == "3+":
                    bedrooms = 3
                elif bedrooms == "4+":
                    bedrooms = 4
                elif bedrooms == "5+":
                    bedrooms = 5

                queryset = queryset.filter(bedrooms__gte=bedrooms)
        except KeyError:
            pass        
        
        try:

            if data["bathrooms"]:

                bathrooms = data["bathrooms"]
                if bathrooms == "0+":
                    bathrooms = 0.0
                elif bathrooms == "1+":
                    bathrooms = 1.0
                elif bathrooms == "2+":
                    bathrooms = 2.0
                elif bathrooms == "3+":
                    bathrooms = 3.0
                elif bathrooms == "4+":
                    bathrooms = 4.0

                queryset = queryset.filter(bathrooms__gte=bathrooms)
        except KeyError:
            pass

        try:
            if data["cath_phrase"]:
                cath_phrase = data["cath_phrase"]
                queryset.filter(description__icontains=cath_phrase)
        except KeyError:
            pass        

        serializer = PropertySerializer(queryset, many=True)

        return Response(serializer.data)
