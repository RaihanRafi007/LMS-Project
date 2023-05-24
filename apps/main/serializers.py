from rest_framework import serializers
from . import models
from django.contrib.flatpages.models import FlatPage
from django.core.mail import send_mail


# Teacher
class TeacherModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields = [
            "id",
            "full_name",
            "email",
            "password",
            "qualification",
            "mobile_no",
            "skills",
            "profile_img",
            "teacher_courses",
            "skill_list",
            "varify_status",
            "otp_digit",
            "login_via_otp",
            "total_teacher_courses",
            "facebook_url",
            "linkedin_url",
            "github_url",
            "website_url",
        ]

    def __init__(self, *args, **kwargs):
        super(TeacherModelSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 1

    def create(self, validate_data):
        email = self.validated_data["email"]
        otp_digit = self.validated_data["otp_digit"]
        instance = super(TeacherModelSerializer, self).create(validate_data)
        send_mail(
            "Varify account",
            "Please verufy account.",
            "rrafi0570@gmail.com",
            [email],
            fail_silently=False,
            html_message=f"<p>Our OTP is</p><p> {otp_digit} </p>",
        )
        return instance


class TeacherDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields = [
            "total_teacher_courses",
            "total_teacher_students",
            "total_teacher_chapters",
        ]


# Category
class CategoryModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseCategory
        fields = ["id", "title", "description", "total_courses"]


class CourseModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = [
            "id",
            "category",
            "teacher",
            "title",
            "description",
            "feature_img",
            "techs",
            "course_chapters",
            "related_videos",
            "tech_list",
            "total_enrolled_students",
            "course_rating",
        ]
        # if gets any pproblem then comment out the depth

    def __init__(self, *args, **kwargs):
        super(CourseModelSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 2
            # 2


class ChapterModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Chapter
        fields = ["id", "course", "title", "description", "video", "remarks"]


# Student
class StudentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = [
            "id",
            "full_name",
            "email",
            "password",
            "username",
            "interested_categories",
            "profile_img",
            "varify_status",
            "otp_digit",
            "login_via_otp",
        ]

    def create(self, validate_data):
        email = self.validated_data["email"]
        otp_digit = self.validated_data["otp_digit"]
        instance = super(StudentModelSerializer, self).create(validate_data)
        send_mail(
            "Varify account",
            "Please verufy account.",
            "rrafi0570@gmail.com",
            [email],
            fail_silently=False,
            html_message=f"<p>Our OTP is</p><p> {otp_digit} </p>",
        )
        return instance


class StudentDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = [
            "enrolled_courses",
            "favourite_courses",
            "complete_assignments",
            "pending_assignments",
        ]


# Student
class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentCourseEnrollment
        fields = ["id", "course", "student", "enrolled_time"]

    # By default nested serializer is read only to write following method is appropriate
    def __init__(self, *args, **kwargs):
        super(StudentCourseEnrollSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 2


class StudentCourseEnrollSerializer2(serializers.ModelSerializer):
    class Meta:
        model = models.StudentCourseEnrollment
        fields = ["id", "course"]

    # By default nested serializer is read only to write following method is appropriate
    def __init__(self, *args, **kwargs):
        super(StudentCourseEnrollSerializer2, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 2


# Student Favorite Courses
class StudentFavouriteCoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentFavouriteCourse
        fields = ["id", "course", "student", "status"]

    # By default nested serializer is read only to write following method is appropriate
    def __init__(self, *args, **kwargs):
        super(StudentFavouriteCoursesSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 2


# Rating
class CourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseRating
        fields = ["id", "course", "student", "rating", "reviews", "review_time"]

    def __init__(self, *args, **kwargs):
        super(CourseRatingSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 1


class StudentAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentAssignment
        fields = [
            "id",
            "teacher",
            "student",
            "title",
            "detail",
            "student_status",
            "add_time",
        ]

    def create(self, validated_data):
        student_assignment = super().create(validated_data)
        # create notification
        teacher = student_assignment.teacher
        student = student_assignment.student
        notif_subject = "assignment"
        notif_for = "student"
        notification = models.Notification.objects.create(
            teacher=teacher,
            student=student,
            notif_subject=notif_subject,
            notif_for=notif_for,
            notif_status=False,
        )
        return student_assignment

        # if gets any pproblem then comment out the depth

    def __init__(self, *args, **kwargs):
        super(StudentAssignmentSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 2


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notification
        fields = [
            "id",
            "teacher",
            "student",
            "notif_subject",
            "notif_for",
            "notif_created_time",
            "notif_status",
        ]


class QuizModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Quiz
        fields = ["id", "teacher", "title", "detail", "assign_status", "add_time"]
        # if gets any pproblem then comment out the depth

    def __init__(self, *args, **kwargs):
        super(QuizModelSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 2
            # 2


class QuestionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.QuizQuestion
        fields = [
            "id",
            "questions",
            "quiz",
            "ans1",
            "ans2",
            "ans3",
            "ans4",
            "right_ans",
        ]
        # if gets any pproblem then comment out the depth

    def __init__(self, *args, **kwargs):
        super(QuestionModelSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 1


class CourseQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseQuiz
        fields = ["id", "course", "teacher", "quiz", "add_time"]

    # By default nested serializer is read only to write following method is appropriate
    def __init__(self, *args, **kwargs):
        super(CourseQuizSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 2


class AttemptQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AttemptQuiz
        fields = ["id", "student", "quiz", "question", "right_ans", "add_time"]

    # By default nested serializer is read only to write following method is appropriate
    def __init__(self, *args, **kwargs):
        super(AttemptQuizSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 2


class StudyMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudyMaterial
        fields = ["id", "course", "title", "description", "upload", "remarks"]

    # By default nested serializer is read only to write following method is appropriate
    def __init__(self, *args, **kwargs):
        super(StudyMaterialSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        self.Meta.depth = 0
        if request and request.method == "GET":
            self.Meta.depth = 1


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FAQ
        fields = ["question", "answer"]


class FlatPagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlatPage
        fields = ["id", "title", "content", "url"]


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Contact
        fields = ["id", "full_name", "email", "query_txt"]


class TeacherStudentChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TeacherStudentChat
        fields = ["id", "teacher", "student", "msg_txt", "msg_from", "msg_time"]

    def to_representation(self, instance):
        representation = super(TeacherStudentChatSerializer, self).to_representation(
            instance
        )
        representation["msg_time"] = instance.msg_time.strftime("%d/%m/%y %H:%M:%S")

        return representation
