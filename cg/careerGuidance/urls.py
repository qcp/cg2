from django.urls import path

from . import views


urlpatterns = [    
    path('', views.cgIndex, name='index'),
    path('qb/', views.qbIndex, name='index'),
    path('qb/<int:id>/', views.qbNew, name='index'),
    path('getLastSetting', views.getLastSetting, name='getLastSetting'),    
    path('getSetting/<int:id>/', views.getSetting, name='getSetting'),

    path('getAllJson', views.getAllJson, name='getAllJson'),
    path('setJson/<int:id>/', views.setJson, name='setJson'),
    path('getJson/<int:id>/', views.getJson, name='getJson'),

    path('sendStatistic/', views.sendStatistic, name='sendStatistic'),
    path('exportStatistic/', views.exportStatistic, name='exportStatistic'),
]