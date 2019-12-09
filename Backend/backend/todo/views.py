from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth.models import User
from todo.serializers import UserSerializer,TodoSerializer,RegisterSerializer,ItemSerializer,TodosSerializer
from todo.models import Todo,Item
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from todo.permissions import IsOwnerOrReadOnly
from rest_framework import permissions
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)


# Create your views here.
class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [ permissions.IsAuthenticated,
                    IsOwnerOrReadOnly,permissions.IsAdminUser]
    
class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [ permissions.IsAuthenticated,
                       IsOwnerOrReadOnly]

class Register(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class Todos(generics.ListAPIView):
    serializer_class=TodosSerializer
    queryset = Todo.objects.all()
    permission_classes = [ permissions.IsAuthenticated,
                     IsOwnerOrReadOnly]
    def get_queryset(self):
        queryset = Todo.objects.filter(owner=self.request.user)
        return queryset 

class TodoList(generics.ListCreateAPIView):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    permission_classes = [ permissions.IsAuthenticated,
                     IsOwnerOrReadOnly]
    def get_queryset(self):
        queryset = Todo.objects.filter(owner=self.request.user)
        return queryset 
        
class TodoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [ permissions.IsAuthenticated,
                      IsOwnerOrReadOnly]
    def get_queryset(self):
        queryset = Todo.objects.filter(owner=self.request.user)
        return queryset 

class ItemList(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [ permissions.IsAuthenticated]
    

class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [ permissions.IsAuthenticated]
    


@api_view(['POST',])
@permission_classes((AllowAny,))
def register_view(request):
    if request.method == 'POST':
        serializer = RegisterSerializer(data = request.data)
        data = {}
        if serializer.is_valid():
            user = serializer.save()
            data['response'] = "successfully registered a new user."
            data['username'] = user.username
            data['email'] = user.email
        else:
            data = serializer.errors
        return Response(data)

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key},
                    status=HTTP_200_OK)