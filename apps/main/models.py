from django.db import models
from django.core import serializers
from django.core.mail import send_mail


# Teacher Model
class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=100, blank=True, null=True)
    qualification = models.CharField(max_length=200)
    mobile_no = models.CharField(max_length=20)
    profile_img = models.ImageField(upload_to="teacher_profile_imgs/", null=True)
    skills = models.TextField()
    varify_status = models.BooleanField(default=False)
    otp_digit = models.CharField(max_length=10, null=True)
    login_via_otp = models.BooleanField(default=False)
    facebook_url = models.URLField(null=True, max_length=200)
    linkedin_url = models.URLField(null=True, max_length=200)
    github_url = models.URLField(null=True, max_length=200)
    website_url = models.URLField(null=True, max_length=200)

    def __str__(self):
        return self.full_name

    def skill_list(self):
        skill_list = self.skills.split(",")
        return skill_list

    # Total teacher courses
    def total_teacher_courses(self):
        teacher_courses = Course.objects.filter(teacher=self).count()
        return teacher_courses

    # Total teacher chapters
    def total_teacher_chapters(self):
        teacher_chapters = Chapter.objects.filter(course__teacher=self).count()
        return teacher_chapters

    # Total teacher students
    def total_teacher_students(self):
        total_students = StudentCourseEnrollment.objects.filter(
            course__teacher=self
        ).count()
        return total_students


# Course Category Model
class CourseCategory(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()

    class Meta:
        verbose_name_plural = "Course categories"

    # Total Courses of this category
    def total_courses(self):
        return Course.objects.filter(category=self).count()

    def __str__(self):
        return self.title


# Course Model
class Course(models.Model):
    category = models.ForeignKey(
        CourseCategory, on_delete=models.CASCADE, related_name="category_courses"
    )
    teacher = models.ForeignKey(
        Teacher, on_delete=models.CASCADE, related_name="teacher_courses"
    )
    title = models.CharField(max_length=150)
    description = models.TextField()
    feature_img = models.ImageField(upload_to="course_img/", null=True)
    techs = models.TextField(null=True)
    course_view = models.BigIntegerField(default=0)

    def __str__(self):
        return self.title

    def related_videos(self):
        related_videos = Course.objects.filter(techs__icontains=self.techs)
        return serializers.serialize("json", related_videos)

    def tech_list(self):
        tech_list = self.techs.split(",")
        return tech_list

    def total_enrolled_students(self):
        total_enrolled_students = StudentCourseEnrollment.objects.filter(
            course=self
        ).count()
        return total_enrolled_students

    def course_rating(self):
        course_rating = CourseRating.objects.filter(course=self).aggregate(
            avg_rating=models.Avg("rating")
        )
        return course_rating["avg_rating"]


# Chapter Model
class Chapter(models.Model):
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="course_chapters"
    )
    title = models.CharField(max_length=150)
    description = models.TextField()
    video = models.FileField(upload_to="chapter_videos/", null=True)
    remarks = models.TextField(null=True)

    def __str__(self):
        return self.title


# Student Moadel
class Student(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100, blank=True, null=True)
    username = models.CharField(max_length=200)
    interested_categories = models.TextField()
    profile_img = models.ImageField(upload_to="student_profile_imgs/", null=True)
    varify_status = models.BooleanField(default=False)
    otp_digit = models.CharField(max_length=10, null=True)
    login_via_otp = models.BooleanField(default=False)

    def __str__(self):
        return self.full_name

        # Total enrolled courses

    def enrolled_courses(self):
        enrolled_courses = StudentCourseEnrollment.objects.filter(student=self).count()
        return enrolled_courses

    # Total favourite chourses
    def favourite_courses(self):
        favourite_courses = StudentFavouriteCourse.objects.filter(student=self).count()
        return favourite_courses

    # complete assignments students
    def complete_assignments(self):
        complete_assignments = StudentAssignment.objects.filter(
            student=self, student_status=True
        ).count()
        return complete_assignments

    # complete assignments students
    def pending_assignments(self):
        pending_assignments = StudentAssignment.objects.filter(
            student=self, student_status=False
        ).count()
        return pending_assignments


# Student Course Enrollment
class StudentCourseEnrollment(models.Model):
    course = models.ForeignKey(
        Course, related_name="enrolled_courses", on_delete=models.CASCADE
    )
    student = models.ForeignKey(
        Student, related_name="enrolled_student", on_delete=models.CASCADE
    )
    enrolled_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Enrolled courses"

    def __str__(self):
        return f"{self.course}-{self.student}"


class CourseRating(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    rating = models.PositiveBigIntegerField(default=0)
    reviews = models.TextField(null=True)
    review_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.course}-{self.rating}"


# Student Favourite Course
class StudentFavouriteCourse(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    status = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.course}-{self.student}"


# Student Assignment
class StudentAssignment(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, null=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=200)
    detail = models.TextField(null=True)
    student_status = models.BooleanField(default=False, null=True)
    add_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


# Notifications Model
class Notification(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, null=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True)
    notif_subject = models.CharField(
        max_length=200, verbose_name="Notification Subject", null=True
    )
    notif_for = models.CharField(max_length=200, verbose_name="Notification For")
    notif_created_time = models.DateTimeField(auto_now_add=True)
    notif_status = models.BooleanField(
        default=False, verbose_name="Notification Status"
    )


# Quiz Model
class Quiz(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=200)
    detail = models.TextField()
    add_time = models.DateTimeField(auto_now_add=True)

    def assign_status(self):
        return CourseQuiz.objects.filter(quiz=self).count()

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Quizzes"


# Quiz Questions Model
class QuizQuestion(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, null=True)
    questions = models.CharField(max_length=200)
    ans1 = models.CharField(max_length=200)
    ans2 = models.CharField(max_length=200)
    ans3 = models.CharField(max_length=200)
    ans4 = models.CharField(max_length=200)
    right_ans = models.CharField(max_length=200)
    add_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.questions


# Add quiz to Course Model
class CourseQuiz(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, null=True)
    # right_ans = models.CharField(max_length=200, null=True)
    add_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Course quizzes"


# Attempt quiz question by student
class AttemptQuiz(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, null=True)
    question = models.ForeignKey(QuizQuestion, on_delete=models.CASCADE, null=True)
    right_ans = models.CharField(max_length=200, null=True)
    add_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Attempted Questions"


# Study Material Model
class StudyMaterial(models.Model):
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="course_study_materials"
    )
    title = models.CharField(max_length=150)
    description = models.TextField()
    upload = models.FileField(upload_to="study_material/", null=True)
    remarks = models.TextField(null=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Course Study Materials"


# FAQ Model
class FAQ(models.Model):
    question = models.CharField(max_length=300)
    answer = models.TextField()

    def __str__(self):
        return self.question


# Contact Model
class Contact(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    query_txt = models.TextField()
    add_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.query_txt

    def save(self, *args, **kwargs):
        send_mail(
            "Contact Query",
            "Here is the message.",
            "rrafi0570@gmail.com",
            [self.email],
            fail_silently=False,
            html_message=f"<p> {self.full_name} </p><p> {self.query_txt} </p>",
        )
        return super(Contact, self).save(*args, **kwargs)  # Call the real save() method


# Message Model
class TeacherStudentChat(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    msg_txt = models.TextField()
    msg_from = models.CharField(max_length=100)
    msg_time = models.DateTimeField(auto_now_add=True)
