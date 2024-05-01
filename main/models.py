from django.db import models

# Create your models here.

## Creating Teacher Model

class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    qualification = models.CharField(max_length=200)
    mobile_no = models.CharField(max_length=20)
    address = models.TextField()

    class Meta:
        verbose_name_plural = "1. Teacher"

## Creating Course Category Model

class CourseCategory(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()

    class Meta:
        verbose_name_plural = "3. Course Categories" # Since on admin panel, model name appear as "Course categorys" so to change it we have to define class "Meta".

## Creating Course Model
class Course(models.Model): 
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE) # This model is created to delete the course category on deletion of the courses.
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE) # This course belongs to one of the teacher.
    title = models.CharField(max_length=150)
    description = models.TextField()
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