from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import TeacherModelSerializer, CategoryModelSerializer, CourseModelSerializer, ChapterModelSerializer
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, RetrieveAPIView
from rest_framework import permissions
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import authenticate
from . import models

# Create your views here.

# class TeacherList(APIView):
#     def get(self, request, *args, **kwargs):
#         teacher = models.Teacher.objects.all()
#         serializer = TeacherSerializer(teacher, many=True)
#         return Response(serializer.data)

# Teacher view
class TeacherListCreateAPIView(ListCreateAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherModelSerializer
    # permission_classes = [permissions.IsAuthenticated]
    
class TacherRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherModelSerializer
    # permission_classes = [permissions.IsAuthenticated]
    
@csrf_exempt
def teacher_login(request):
    email = request.POST["email"]
    password = request.POST["password"]
    try:
        teacherData = models.Teacher.objects.get(email=email, password=password)
    except models.Teacher.DoesNotExist:
        # return JsonResponse({"error": "Invalid request data."}, status=400)
        teacherData = None
    if teacherData:
        return JsonResponse({'bool': True, 'teacher_id': teacherData.id})
    else:
        return JsonResponse({'bool': False})
    
# Teacher List
class TeacherCourseListCreateAPIView(ListCreateAPIView):
    serializer_class = CourseModelSerializer
    # permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = models.Teacher.objects.get(pk=teacher_id)
        return models.Course.objects.filter(teacher=teacher)
  
  # Teacher Detail
class TeacherCourseDetailView(RetrieveUpdateDestroyAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseModelSerializer
    # permission_classes = [permissions.IsAuthenticated]
    


# Category
class CategoryListCreateAPIView(ListCreateAPIView):
    queryset = models.CourseCategory.objects.all()
    serializer_class = CategoryModelSerializer
    # permission_classes = [permissions.IsAuthenticated]

# Course
class CourseListCreateAPIView(ListCreateAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseModelSerializer
    # permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        qs = super().get_queryset()
        if 'result' in self.request.GET:
            limit = int(self.request.GET['result'])
            qs = models.Course.objects.all().order_by('-id')[:limit]
        
        if 'category' in self.request.GET:
            category = self.request.GET['category']
            qs = models.Course.objects.filter(techs__icontains=category)
        
        if 'skill_name' in self.request.GET and 'teacher' in self.request.GET:
            skill_name = self.request.GET['skill_name']
            teacher= self.request.GET['teacher']
            teacher = models.Teacher.objects.filter(id=teacher).first()
            qs = models.Course.objects.filter(techs__icontains=skill_name, teacher=teacher)
        
        return qs
        
# Course Detail
class CourseDetailView(RetrieveAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseModelSerializer
    # permission_classes = [permissions.IsAuthenticated]
    
 # Chapter
class ChapterListCreateAPIView(ListCreateAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterModelSerializer
    # permission_classes = [permissions.IsAuthenticated]
    

 # Chapter Detail
class ChapterDetailView(RetrieveUpdateDestroyAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterModelSerializer
    # permission_classes = [permissions.IsAuthenticated]
    
    
# Course Chapter
class CourseChapterListAPIView(ListAPIView):
    serializer_class = ChapterModelSerializer
    # permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        course_id = self.kwargs['course_id']
        course = models.Course.objects.get(pk=course_id)
        return models.Chapter.objects.filter(course=course)
    
       



