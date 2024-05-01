from django.urls import path
from . import views

urlpatterns = [
    path('teacher/', views.TeacherList.as_view()), # URL: "http://127.0.0.1:8000/api/teacher/"
    # path('teacher/<int:pk>/', views.TeacherDetail.as_view()), # URL: "http://127.0.0.1:8000/api/teacher/1/"
]
