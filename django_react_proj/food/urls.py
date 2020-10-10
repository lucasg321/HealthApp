from django.contrib import admin
from django.urls import path, re_path
from . import views
from django.conf.urls import url

urlpatterns = [
    url(r'^api/food/$', views.food_list),
    url(r'^api/food/([0-9])$', views.food_detail),
]