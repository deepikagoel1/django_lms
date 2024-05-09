from django.urls import path
from . import views

urlpatterns = [
    #Teacher
    path('teacher/', views.TeacherList.as_view()), # URL: "http://127.0.0.1:8000/api/teacher/"
    path('teacher/<int:pk>/', views.TeacherDetail.as_view()), # URL: "http://127.0.0.1:8000/api/teacher/1/"
    path('teacher-login/',views.teacher_login),

    #Course Category
    path('course-category/', views.CategoryList.as_view()),
    path('course/', views.CourseList.as_view()),

    #Chapter
    path('chapter/', views.ChapterList.as_view()),


    #Teacher Courses
    path('teacher-courses/<int:teacher_id>/', views.TeacherCourseList.as_view()),
]
