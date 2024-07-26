from rest_framework import serializers
from . import models

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields = ['id', 'full_name', 'email', 'password','qualification', 'mobile_no', 'skills', 'bio', 'profile_img', 'teacher_courses', 'skills_list']
        
    def __init__(self, *args, **kwargs):
        super(TeacherSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseCategory
        fields = ['id', 'title', 'description']
    def __init__(self, *args, **kwargs):
        super(CategorySerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1

class TeacherDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields = ['total_teacher_courses', 'total_teacher_chapters', 'total_teacher_students']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = ['id', 'category', 'teacher', 'title', 'description', 'feature_img', 'techs', 'course_chapters', 'related_videos', 'tech_list', 'total_enrolled_students', 'course_rating']
        # depth = 1 # It will fetch the Category related data and the teacher related data. Fetching the Level-1 details
        # But if we want to capture further more details related to the categories as well then we can define the depth value as 2 
        # or whatsoever since in our models.py file this Serializer is linked with category so we can define it as level 2 
        # and if more data is linked to other model then we can define the depth as 3 or whatsoever.
        # To fetch the chapter related videos for a particular course, we are defining related_name in models.py in the Course Class
        # and passing the values to the field 'course_chapters' in the CourseSerializer class.
    def __init__(self, *args, **kwargs):
        super(CourseSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Chapter
        fields = ['id', 'course', 'title', 'description', 'video', 'remarks']
    def __init__(self, *args, **kwargs):
        super(ChapterSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = ['id', 'full_name', 'email', 'password','qualification', 'mobile_no', 'interested_categories', 'profile_img']
        # depth = 1
    def __init__(self, *args, **kwargs):
        super(StudentSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1

class StudentEnrolledCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentCourseEnrollment
        fields = ['id', 'course', 'student', 'enrolled_time']
        # depth = 1
    def __init__(self, *args, **kwargs):
        super(StudentEnrolledCourseSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class StudentRatingCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseRating
        fields = ['id', 'course', 'student', 'rating', 'remarks', 'review_time']
        # depth = 1
    def __init__(self, *args, **kwargs):
        super(StudentRatingCourseSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1

class StudentFavCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentFavoriteCourse
        fields = ['id', 'course', 'student', 'status']
    def __init__(self, *args, **kwargs):
        super(StudentFavCourseSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class StudentAssSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentAssignment
        fields = ['id', 'teacher', 'student', 'title', 'detail','student_status', 'add_time']
        # depth = 1 # It will fetch the Category related data and the teacher related data. Fetching the Level-1 details
        # But if we want to capture further more details related to the categories as well then we can define the depth value as 2 
        # or whatsoever since in our models.py file this Serializer is linked with category so we can define it as level 2 
        # and if more data is linked to other model then we can define the depth as 3 or whatsoever.
        # To fetch the chapter related videos for a particular course, we are defining related_name in models.py in the Course Class
        # and passing the values to the field 'course_chapters' in the CourseSerializer class.
    def __init__(self, *args, **kwargs):
        super(StudentAssSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class StudentDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = ['total_enrolled_courses', 'total_favorite_courses', 'completed_assignments', 'pending_assignments']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notification
        fields = ['id', 'teacher', 'student', 'notif_subject', 'notif_for', 'notif_creat_time', 'notif_read_status']

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Quiz
        fields = ['id', 'teacher', 'title', 'detail', 'add_time']
        # depth = 1 # It will fetch the Category related data and the teacher related data. Fetching the Level-1 details
        # But if we want to capture further more details related to the categories as well then we can define the depth value as 2 
        # or whatsoever since in our models.py file this Serializer is linked with category so we can define it as level 2 
        # and if more data is linked to other model then we can define the depth as 3 or whatsoever.
        # To fetch the chapter related videos for a particular course, we are defining related_name in models.py in the Course Class
        # and passing the values to the field 'course_chapters' in the CourseSerializer class.
    def __init__(self, *args, **kwargs):
        super(QuizSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1
