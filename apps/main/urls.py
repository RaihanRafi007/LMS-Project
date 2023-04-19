from django.urls import path
from . import views

urlpatterns = [
    # teacher
    path('teacher/', views.TeacherListCreateAPIView.as_view()),
    path('teacher/<int:pk>', views.TacherRetrieveUpdateDestroyAPIView.as_view()),
    path('teacher/login/', views.teacher_login),
    # Category
    path('category/', views.CategoryListCreateAPIView.as_view()),
    # Course
    path('course/', views.CourseListCreateAPIView.as_view()),
    # Course Detail
    path('course/<int:pk>', views.CourseDetailView.as_view()),
    # chapter
    path('chapter/', views.ChapterListCreateAPIView.as_view()),
    # Specific course chapter
    path('course-chapters/<int:course_id>', views.CourseChapterListAPIView.as_view()),
     # Specific course chapter
    path('chapter/<int:pk>', views.ChapterDetailView.as_view()),
    # Teacher
    path('teacher-courses/<int:teacher_id>', views.TeacherCourseListCreateAPIView.as_view()),
    # Course Detail
    path('teacher-course-detail/<int:pk>', views.TeacherCourseDetailView.as_view()),

]
