from django.conf import settings
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import MyUser
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('id', 'email')


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('id', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = MyUser.objects.create_user(validated_data['email'],
                                          None,
                                          validated_data['password'])
        return user


class LoginUserSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")


class MyBookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyBookmark
        fields = ('__all__')

        def create(self, validated_data):
            bookmark = MyBookmark.objects.create(validated_data)
            return bookmark
