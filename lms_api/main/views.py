from django.shortcuts import render
# Create your views here.
# We are going to use class based Views as we have to do the multiple things and not Function Based Views
from rest_framework.views import APIView
from .serializers import TeacherSerializer, CategorySerializer, CourseSerializer, ChapterSerializer, StudentSerializer, StudentEnrolledCourseSerializer, StudentRatingCourseSerializer, TeacherDashboardSerializer
from . import models
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import permissions
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.datastructures import MultiValueDictKeyError
from django.views.decorators.http import require_http_methods


# class TeacherList(APIView):
#     def get(self, request):  #Using post method instead of get method from API
#         teachers = models.Teacher.objects.all()
#         serializer = TeacherSerializer(teachers, many = True)
#         return Response(serializer.data)

class TeacherList(generics.ListCreateAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        qs = super().get_queryset()
        if 'skills' in self.request.GET:
                skills = self.request.GET['skills']
                qs = models.Teacher.objects.filter(techs__icontains = skills)
                # When we click on the selected category then we 
                # have to send the related category to the server and required to fetch the data from the server.
        return qs


class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes = [permissions.IsAuthenticated]

class TeacherDashboardView(generics.RetrieveAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherDashboardSerializer

@csrf_exempt
def teacher_login(request):
    email = request.POST.get('email')
    password = request.POST.get('password')
    try:
        teacherData = models.Teacher.objects.filter(email = email, password = password).first()
    except models.Teacher.DoesnotExist: 
        teacherData = None
    if teacherData:
        return JsonResponse({'bool': True, 'teacher_id':teacherData.id})
    else:
        return JsonResponse({'bool': False})
    return render(request)


@csrf_exempt
@require_http_methods(["GET", "POST"])
def teacher_change_password(request, teacher_id):

    new_password = request.POST.get('new_password')
    confirm_password = request.POST.get('confirm_password')
    if not new_password or not confirm_password:
        return JsonResponse({'status': 'error', 'message': 'Missing parameters'}, status=400)

    if new_password != confirm_password:
        return JsonResponse({'status': 'error', 'message': 'Passwords do not match'}, status=400)

    try:
        teacherData = models.Teacher.objects.get(id = teacher_id)
        
        teacherData.password = new_password  # Ensure this logic adheres to your password hashing logic
        teacherData.save()
        return JsonResponse({'bool': True})
            
    except models.Teacher.DoesNotExist: 
        return JsonResponse({'bool': False, 'message': 'Teacher not found'}, status=404)
    

class CategoryList(generics.ListCreateAPIView):
    queryset = models.CourseCategory.objects.all()
    serializer_class = CategorySerializer
    # permission_classes = [permissions.IsAuthenticated]

## CourseList will represent all the courses
class CourseList(generics.ListCreateAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer
    # permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        qs = super().get_queryset()
        if 'result' in self.request.GET:
            limit = int(self.request.GET['result'])
            qs = models.Course.objects.all().order_by('-id')[:limit]

        if 'category' in self.request.GET:
            category = self.request.GET['category']
            qs = models.Course.objects.filter(techs__icontains = category)
            # When we click on the selected category then we 
            # have to send the related category to the server and required to fetch the data from the server.

        if 'skill_name' in self.request.GET and 'teacher' in self.request.GET:
            skill_name = self.request.GET['skill_name']
            teacher = self.request.GET['teacher']
            teacher = models.Teacher.objects.filter(id = teacher).first()
            qs = models.Course.objects.filter(techs__icontains = skill_name,teacher=teacher)
        return qs
    
#To show the courses which were added by a specific teacher so it will be TeacherCourseList.
class TeacherCourseList(generics.ListCreateAPIView):
    # queryset = models.Course.objects.all()
    serializer_class = CourseSerializer
    # permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = models.Teacher.objects.get(pk=teacher_id)
        return models.Course.objects.filter(teacher=teacher)

class ChapterList(generics.ListCreateAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer
    # permission_classes = [permissions.IsAuthenticated]

class CourseChapterList(generics.ListAPIView):
    # queryset = models.CourseChapter.objects.all()
    serializer_class = ChapterSerializer
    # permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        course_id = self.kwargs['course_id']
        course = models.Course.objects.get(pk=course_id)
        return models.Chapter.objects.filter(course=course)

class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer


# TeacherCourseDetail will fetch the current Id data.
#RetrieveUpdateDestroyAPIView is used to change the data using PUT method of API, Deleting the data, GET method as well.
class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer
    # # permission_classes = [permissions.IsAuthenticated]
    # def get_queryset(self):
    #     teacher_id = self.kwargs['teacher_id']
    #     teacher = models.Teacher.objects.get(pk=teacher_id)
    #     return models.Course.objects.filter(teacher=teacher)

#RetrieveAPIView is used for Get only
class CourseDetailView(generics.RetrieveAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer

#ListCreateAPIView is used for Post and Get
class StudentList(generics.ListCreateAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentSerializer

class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentSerializer

@csrf_exempt
def student_login(request):
    email = request.POST.get('email')
    password = request.POST.get('password')
    try:
        studentData = models.Student.objects.filter(email = email, password = password).first()
    except models.student.DoesnotExist: 
        studentData = None
    if studentData:
        return JsonResponse({'bool': True, 'student_id':studentData.id})
    else:
        return JsonResponse({'bool': False})
    return render(request)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def student_change_password(request, student_id):

    new_password = request.POST.get('new_password')
    confirm_password = request.POST.get('confirm_password')
    if not new_password or not confirm_password:
        return JsonResponse({'status': 'error', 'message': 'Missing parameters'}, status=400)

    if new_password != confirm_password:
        return JsonResponse({'status': 'error', 'message': 'Passwords do not match'}, status=400)

    try:
        studentData = models.Student.objects.get(id = student_id)
        
        studentData.password = new_password  # Ensure this logic adheres to your password hashing logic
        studentData.save()
        return JsonResponse({'bool': True})
            
    except models.Student.DoesNotExist: 
        return JsonResponse({'bool': False, 'message': 'Teacher not found'}, status=404)


class StudentEnrolledCourseList(generics.ListCreateAPIView):
    queryset = models.StudentCourseEnrollment.objects.all()
    serializer_class = StudentEnrolledCourseSerializer
    
@csrf_exempt
def fetch_enroll_status(request,course_id, student_id): 

    student = models.Student.objects.filter(id = student_id).first()
    course = models.Course.objects.filter(id = course_id).first()
    EnrollState = models.StudentCourseEnrollment.objects.filter(course = course, student = student).count()
    if EnrollState:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})
    return render(request)

class EnrolledStudentList(generics.ListAPIView): 

    student = models.StudentCourseEnrollment.objects.all()
    serializer_class = StudentEnrolledCourseSerializer
    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id = self.kwargs['course_id']
            course = models.Course.objects.get(pk=course_id)
            return models.StudentCourseEnrollment.objects.filter(course=course)
        
        elif 'teacher_id' in self.kwargs:
            teacher_id = self.kwargs['teacher_id']
            teacher = models.Teacher.objects.get(pk=teacher_id)
            return models.StudentCourseEnrollment.objects.filter(course__teacher = teacher)
class CourseRatingList(generics.ListCreateAPIView):
    student = models.CourseRating.objects.all()
    serializer_class = StudentRatingCourseSerializer

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        # student_id = self.kwargs['student_id']
        course = models.Course.objects.get(pk=course_id)
        return models.CourseRating.objects.filter(course = course)

@csrf_exempt
def fetch_rating_status(request,course_id, student_id): 

    student = models.Student.objects.filter(id = student_id).first()
    course = models.Course.objects.filter(id = course_id).first()
    RatingState = models.CourseRating.objects.filter(course = course, student = student).count()
    if RatingState:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})
    return render(request)