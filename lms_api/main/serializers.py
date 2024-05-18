from rest_framework import serializers
from . import models

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields = ['id', 'full_name', 'email', 'password','qualification', 'mobile_no', 'skills', 'bio', 'teacher_courses', 'skills_list']
        depth = 1

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseCategory
        fields = ['id', 'title', 'description']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = ['id', 'category', 'teacher', 'title', 'description', 'feature_img', 'techs', 'course_chapters', 'related_videos', 'tech_list']
        depth = 1 # It will fetch the Category related data and the teacher related data. Fetching the Level-1 details
        # But if we want to capture further more details related to the categories as well then we can define the depth value as 2 
        # or whatsoever since in our models.py file this Serializer is linked with category so we can define it as level 2 
        # and if more data is linked to other model then we can define the depth as 3 or whatsoever.
        # To fetch the chapter related videos for a particular course, we are defining related_name in models.py in the Course Class
        # and passing the values to the field 'course_chapters' in the CourseSerializer class.

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Chapter
        fields = ['id', 'course', 'title', 'description', 'video', 'remarks']

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = ['id', 'full_name', 'email', 'password','qualification', 'mobile_no', 'interested_categories']
        # depth = 1