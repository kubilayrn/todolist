from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from todo import views
from todo.views import register_view,login
from django.conf.urls import url


urlpatterns = [
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('todos/', views.Todos.as_view()),
    path('todo/', views.TodoList.as_view()),
    path('todo/<int:pk>/', views.TodoDetail.as_view()),
    path('items/', views.ItemList.as_view()),
    path('items/<int:pk>/', views.ItemDetail.as_view()),
    path('register/', register_view),
    path('login/', login)
]

urlpatterns = format_suffix_patterns(urlpatterns)