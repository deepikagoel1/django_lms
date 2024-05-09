from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token


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

    class Meta:
        verbose_name_plural = "1. Teacher"

## Creating Course Category Model

class CourseCategory(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()

    class Meta:
        verbose_name_plural = "3. Course Categories" # Since on admin panel, model name appear as "Course categorys" so to change it we have to define class "Meta".
    
    def __str__(self):
        return self.title

## Creating Course Model
class Course(models.Model): 
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE) # This model is created to delete the course category on deletion of the courses.
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE) # This course belongs to one of the teacher.
    title = models.CharField(max_length=150)
    description = models.TextField()
    feature_img = models.ImageField(upload_to ="course_imgs/", null=True)
    techs = models.TextField(null=True)
    class Meta:
        verbose_name_plural = "4. Course"

class Student(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    qualification = models.CharField(max_length=200)
    mobile_no = models.CharField(max_length=20)
    address = models.TextField()
    interested_categories = models.TextField()

    class Meta:
        verbose_name_plural = "2. Student"

class Chapter(models.Model): 
    course = models.ForeignKey(Course, on_delete=models.CASCADE) # This model is created to delete the course category on deletion of the courses.
    title = models.CharField(max_length=150)
    description = models.TextField()
    video = models.FileField(upload_to ="chapter_videos/", null=True)
    remarks = models.TextField(null=True)
    class Meta:
        verbose_name_plural = "5. Chapter"