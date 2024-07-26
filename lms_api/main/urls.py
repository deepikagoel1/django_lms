from django.urls import path
from . import views

urlpatterns = [
    #Teacher
    path('teacher/', views.TeacherList.as_view()), # URL: "http://127.0.0.1:8000/api/teacher/"
    path('teacher/<int:pk>/', views.TeacherDetail.as_view()), # URL: "http://127.0.0.1:8000/api/teacher/1/"
    path('teacher-login/',views.teacher_login),
    path('teacher/change-password/<int:teacher_id>/', views.teacher_change_password),
    path('teacher/dashboard/<int:pk>/', views.TeacherDashboardView.as_view()),

    #Course Category
    path('course-category/', views.CategoryList.as_view()),
    path('course/', views.CourseList.as_view()),

    #Specific Course Chapter
    path('course-chapters/<int:course_id>/', views.CourseChapterList.as_view()),
    path('course/<int:pk>/', views.CourseDetailView.as_view()),

    #Chapter
    path('chapter/<int:pk>', views.ChapterDetailView.as_view()),
    path('chapter/', views.ChapterList.as_view()),

    #Teacher Courses
    path('teacher-courses/<int:teacher_id>/', views.TeacherCourseList.as_view()),

    #Teacher specific Course
    path('teacher-courses-detail/<int:pk>', views.TeacherCourseDetail.as_view()),

    #Student
    path('student/', views.StudentList.as_view()),
    path('student/<int:pk>/', views.StudentDetail.as_view()), # URL: "http://127.0.0.1:8000/api/teacher/1/"

    path('student-login/',views.student_login),
    path('student/change-password/<int:student_id>/', views.student_change_password),


    path('student-enroll-courses/', views.StudentEnrolledCourseList.as_view()),
    path('fetch-enroll-status/<int:course_id>/<int:student_id>', views.fetch_enroll_status),
    path('fetch-enrolled-students/<int:course_id>/', views.EnrolledStudentList.as_view()),
    path('course-rating/<int:course_id>/', views.CourseRatingList.as_view()),
    path('fetch-course-rating/<int:course_id>/<int:student_id>', views.fetch_rating_status),
    path('fetch-all-enrolled-students/<int:teacher_id>/', views.EnrolledStudentList.as_view()),
    path('fetch-enrolled-courses/<int:student_id>/', views.EnrolledStudentList.as_view()),
    path('fetch-recommended-courses/<int:studentId>/', views.CourseList.as_view()),
    path('course-rating/', views.CourseRatingList.as_view()),
    path('fetch-rating-status/<int:student_id>/<int:course_id>', views.fetch_rating_status),
    path('student-add-favorite-course/', views.StudentFavCourseList.as_view()),
    path('student-remove-favorite-course/<int:course_id>/<int:student_id>', views.rem_fav_course),
    path('fetch-fav-status/<int:student_id>/<int:course_id>', views.fetch_fav_status),
    path('fetch-fav-courses/<int:student_id>', views.StudentFavCourseList.as_view()),
    path('student-assignment/<int:teacher_id>/<int:student_id>', views.AssignmentList.as_view()),
    path('my-assignment/<int:student_id>', views.MyAssignmentList.as_view()),
    path('update-assignment/<int:pk>', views.UpdateAssignmentList.as_view()),
    path('student/dashboard/<int:pk>/', views.StudentDashboardView.as_view()),
    path('student/fetch-all-notifications/<int:student_id>/', views.NotificationList.as_view()),
    path('save-notification/', views.NotificationList.as_view()),
    path('teacher/fetch-all-notifications/<int:teacher_id>/', views.NotificationList.as_view()),

    ]
