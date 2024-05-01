from django.shortcuts import render
# Create your views here.
# We are going to use class based Views as we have to do the multiple things and not Function Based Views
from rest_framework.views import APIView
from .serializers import TeacherSerializer
from . import models
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import permissions

# class TeacherList(APIView):
#     def get(self, request):  #Using post method instead of get method from API
#         teachers = models.Teacher.objects.all()
#         serializer = TeacherSerializer(teachers, many = True)
#         return Response(serializer.data)

class TeacherList(generics.ListCreateAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [permissions.IsAuthenticated]

class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [permissions.IsAuthenticated]