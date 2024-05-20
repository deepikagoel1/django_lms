from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token
from django.core import serializers

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

# Create your models here.

## Creating Teacher Model

class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    qualification = models.CharField(max_length=200)
    mobile_no = models.CharField(max_length=20)
    skills = models.TextField()
    bio = models.TextField(null=True)

    class Meta:
        verbose_name_plural = "1. Teacher"

    def skills_list(self):
        skills_list = self.skills.split(",")
        return skills_list

## Creating Course Category Model

class CourseCategory(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()

    class Meta:
        verbose_name_plural = "2. Course Categories" # Since on admin panel, model name appear as "Course categorys" so to change it we have to define class "Meta".
    
    def __str__(self):
        return self.title

## Creating Course Model
class Course(models.Model): 
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE) # This model is created to delete the course category on deletion of the courses.
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='teacher_courses') # This course belongs to one of the teacher.
    title = models.CharField(max_length=150)
    description = models.TextField()
    feature_img = models.ImageField(upload_to ="course_imgs/", null=True)
    techs = models.TextField(null=True)
    class Meta:
        verbose_name_plural = "3. Course"
    def related_videos(self):
        related_videos = Course.objects.filter(techs__icontains=self.techs)
        return serializers.serialize('json', related_videos)
    def tech_list(self):
        tech_list = self.techs.split(",")
        return tech_list
    def __str__(self):
        return self.title

class Student(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    qualification = models.CharField(max_length=200)
    mobile_no = models.CharField(max_length=20)
    interested_categories = models.TextField()

    def __str__(self):                    # Since, we are not returning anything from Student, so we are returning Student's name as a string.
        return self.full_name

    class Meta:
        verbose_name_plural = "5. Student"
    
    

class Chapter(models.Model): 
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='course_chapters') # This model is created to delete the course category on deletion of the courses.
    title = models.CharField(max_length=150)
    description = models.TextField()
    video = models.FileField(upload_to ="chapter_videos/", null=True)
    remarks = models.TextField(null=True)
    class Meta:
        verbose_name_plural = "4. Chapter"

# Student Course Enrollment
#If Course is deleted by the student and the model then course data will be deleted from the backend so on_delete=models.CASCADE is used.
#If we want to fetch the number of courses enrolled by the student then we have to use the "Enrolled_Courses" 
# related name based on the student id and course id then we can fetch the details.

class StudentCourseEnrollment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name = 'enrolled_courses') # This model is created to delete the course category on deletion of the courses.
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name = 'enrolled_student')
    enrolled_time = models.DateTimeField(auto_now_add=True)
    class Meta:
        verbose_name_plural = "6. Enrolled Courses"
    def __str__(self):
        return f"{self.course}-{self.student}"
