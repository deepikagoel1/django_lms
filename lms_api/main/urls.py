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

    #Specific Course Chapter
    path('course-chapters/<int:course_id>/', views.CourseChapterList.as_view()),

    #Chapter
    path('chapter/<int:pk>', views.ChapterDetailView.as_view()),
    path('chapter/', views.ChapterList.as_view()),

    #Teacher Courses
    path('teacher-courses/<int:teacher_id>/', views.TeacherCourseList.as_view()),

    #Teacher specific Course
    path('teacher-courses-detail/<int:pk>', views.TeacherCourseDetail.as_view()),
    ]
