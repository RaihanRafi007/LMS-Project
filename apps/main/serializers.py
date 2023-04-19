from rest_framework import serializers
from . import models

# Teacher
class TeacherModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields = ['id','full_name','detail','email','password','qualification','mobile_no','skills', 'teacher_courses', 'skill_list']
        depth = 1

# Category
class CategoryModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseCategory
        fields = ['id','title','description']

class CourseModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = ['id','category', 'teacher', 'title','description', 'feature_img', 'techs', 'course_chapters', 'related_videos', 'tech_list'] 
        depth = 1
        
class ChapterModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Chapter
        fields = ['id','course', 'title','description', 'video', 'remarks'] 