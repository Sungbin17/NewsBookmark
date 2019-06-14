from rest_framework import permissions, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.settings import api_settings

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

from .serializers import *
from .models import *
from datetime import datetime


class RegistrationAPI(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny, ]
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        payload = jwt_payload_handler(user)
        print(payload)
        token = jwt_encode_handler(payload)
        user.token = token
        user.save()
        response = {'token': user.token, 'isAuthenticated': True,
                    'user': {'user_id': user.id, 'email': user.email, 'name': user.name}}
        return Response(response)


# 유저가 로그인할 때 사용되는 API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        try:
            token = user.token
            if token is None:
                payload = jwt_payload_handler(user)
                token = jwt_encode_handler(payload)
                user.token = token
                user.save()
        except Exception as e:
            print(e)
            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)
            user.token = token
            user.save()
        print(token)
        response = {'token': user.token, 'isAuthenticated': True,
                    'user': {'user_id': user.id, 'email': user.email, 'name': user.name}}
        print(response)
        return Response(response)


class LoadUserAPI(APIView):
    permission_classes = [permissions.AllowAny, ]

    def get(self, request):
        user = self.request.user
        print(user)
        response = {'token': user.token, 'isAuthenticated': True,
                    'user': {'user_id': user.id, 'email': user.email, 'name': user.name}}
        return Response(response)


class MyBookmarkViewSet(APIView):
    serializer_class = MyBookmarkSerializer
    permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request):
        user = self.request.user
        bookmarks = MyBookmark.objects.filter(user=user)
        serializer = MyBookmarkSerializer(bookmarks, many=True)
        print(serializer.data)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        data = request.data
        print(data)
        if data['image_url'] == False:
            data['image_url'] = ''
        try:
            if data['remove'] == 'remove':
                bookmarks = MyBookmark.objects.filter(user=self.request.user)
                bookmarks = bookmarks.filter(headline=data['headline'])
                bookmarks.delete()
                return Response({'msg': 'success'})
        except:
            pass
        pub_date = data['pub_date'].split('T')[0]
        data['pub_date'] = pub_date
        if self.request.user.is_authenticated:
            user = self.request.user.id
            data['user'] = user
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'msg': 'success'})
            else:
                print(serializer.errors)
                return Response({'msg': 'failed'})
        else:
            return Response({'msg': 'login required'})
