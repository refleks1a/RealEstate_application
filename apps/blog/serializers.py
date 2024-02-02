from rest_framework import serializers
from .models import Post, PostViews

from ..profiles.serializers import ProfileSerializer


class PostSerializer(serializers.ModelSerializer):

    photo1 = serializers.SerializerMethodField()
    photo2 = serializers.SerializerMethodField()
    photo3 = serializers.SerializerMethodField()

    author = serializers.SerializerMethodField()

    class Meta:
        model = Post
        exclude = [
            "pkid",
        ]

    def get_photo1(self,obj):
        return obj.photo1.url 

    def get_photo2(self,obj):
        return obj.photo2.url 

    def get_photo3(self,obj):
        return obj.photo3.url    

    def get_author(self, obj):
        serializer = ProfileSerializer(obj.author)
        return serializer.data


class PostCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        exclude = [
            "updated_at", "pkid",
        ]


class PostViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostViews
        exclude = [
            "updated_at", "pkid",
        ]
