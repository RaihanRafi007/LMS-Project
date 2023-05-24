from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import (
    TeacherModelSerializer,
    CategoryModelSerializer,
    CourseModelSerializer,
    ChapterModelSerializer,
    StudentModelSerializer,
    StudentCourseEnrollSerializer,
    CourseRatingSerializer,
    TeacherDashboardSerializer,
    StudentFavouriteCoursesSerializer,
    StudentAssignmentSerializer,
    StudentDashboardSerializer,
    NotificationSerializer,
    QuizModelSerializer,
    QuestionModelSerializer,
    CourseQuizSerializer,
    AttemptQuizSerializer,
    StudyMaterialSerializer,
    FAQSerializer,
    FlatPagesSerializer,
    ContactSerializer,
    TeacherStudentChatSerializer,
    StudentCourseEnrollSerializer2,
)
from rest_framework.response import Response
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from rest_framework import permissions
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import authenticate
from . import models
from django.db.models import Q, F, Avg
from django.contrib.flatpages.models import FlatPage
from random import randint
from django.core.mail import send_mail


# Create your views here.

# class TeacherList(APIView):
#     def get(self, request, *args, **kwargs):
#         teacher = models.Teacher.objects.all()
#         serializer = TeacherSerializer(teacher, many=True)
#         return Response(serializer.data)


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = "page_size"
    max_page_size = 2


# Teacher view
class TeacherListCreateAPIView(ListCreateAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherModelSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if "popular" in self.request.GET:
            limit = int(self.request.GET["popular"])
            return models.Teacher.objects.all().order_by("-id")[:limit]

            # category = self.request.GET["category"]
            # qs = models.Course.objects.filter(techs__icontains=category)


class TeacherRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherModelSerializer
    # permission_classes = [permissions.IsAuthenticated]


class TeacherDashboard(RetrieveAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherDashboardSerializer
    # permission_classes = [permissions.IsAuthenticated]


@csrf_exempt
def teacher_change_password(request, teacher_id):
    password = request.POST["password"]
    try:
        teacherData = models.Teacher.objects.get(id=teacher_id)
    except models.Teacher.DoesNotExist:
        teacherData = None
    if teacherData:
        models.Teacher.objects.filter(id=teacher_id).update(password=password)
        return JsonResponse({"bool": True})
    else:
        return JsonResponse({"bool": False})


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
        if not teacherData.varify_status:
            return JsonResponse(
                {
                    "bool": False,
                    "msg": "Account isn't verified!",
                }
            )
        else:
            if teacherData.login_via_otp:
                # Send OTP Email
                otp_digit = randint(100000, 999999)
                send_mail(
                    "Varify account",
                    "Please verufy account.",
                    "rrafi0570@gmail.com",
                    [teacherData.email],
                    fail_silently=False,
                    html_message=f"<p>Your OTP is</p><p> {otp_digit} </p>",
                )
                teacherData.otp_digit = otp_digit
                teacherData.save()
                return JsonResponse(
                    {"bool": True, "teacher_id": teacherData.id, "login_via_otp": True}
                )
            else:
                return JsonResponse(
                    {"bool": True, "teacher_id": teacherData.id, "login_via_otp": False}
                )

    else:
        return JsonResponse(
            {
                "bool": False,
                "msg": "Invalid Email or Password!",
            }
        )


@csrf_exempt
def varify_teacher_via_otp(request, teacher_id):
    otp_digit = request.POST.get("otp_digit")
    varify = models.Teacher.objects.filter(id=teacher_id, otp_digit=otp_digit).first()
    if varify:
        models.Teacher.objects.filter(id=teacher_id, otp_digit=otp_digit).update(
            varify_status=True
        )

        return JsonResponse({"bool": True, "teacher_id": varify.id})

    else:
        return JsonResponse({"bool": False, "msg": "Please enter valid OTP"})


# Teacher List
class TeacherCourseListCreateAPIView(ListCreateAPIView):
    serializer_class = CourseModelSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        teacher_id = self.kwargs["teacher_id"]
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
    pagination_class = StandardResultsSetPagination

    # permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        qs = super().get_queryset()
        if "result" in self.request.GET:
            limit = int(self.request.GET["result"])
            qs = models.Course.objects.all().order_by("-id")[:limit]

        # Fetch popular courses based on ratings
        if "popular" in self.request.GET:
            popular_limit = self.request.GET["popular"]
            if popular_limit and popular_limit.isdigit() and int(popular_limit) > 0:
                limit = int(popular_limit)
                qs = qs.annotate(avg_rating=Avg("courserating__rating")).order_by(
                    "-avg_rating"
                )[:limit]
            else:
                qs = qs.annotate(avg_rating=Avg("courserating__rating")).order_by(
                    "-avg_rating"
                )

        if "category" in self.request.GET:
            category = self.request.GET["category"]
            category = models.CourseCategory.objects.filter(id=category).first()
            qs = models.Course.objects.filter(category=category)

        if "skill_name" in self.request.GET and "teacher" in self.request.GET:
            skill_name = self.request.GET["skill_name"]
            teacher = self.request.GET["teacher"]
            teacher = models.Teacher.objects.filter(id=teacher).first()
            qs = models.Course.objects.filter(
                techs__icontains=skill_name, teacher=teacher
            )

        if "searchstring" in self.kwargs:
            search = self.kwargs["searchstring"]
            if search:
                qs = models.Course.objects.filter(
                    Q(title__icontains=search) | Q(techs__icontains=search)
                )

        elif "studentId" in self.kwargs:
            student_id = self.kwargs["studentId"]
            student = models.Student.objects.get(pk=student_id)
            print(student.interested_categories)
            queries = [
                Q(techs__iendswith=value) for value in student.interested_categories
            ]
            query = queries.pop()
            for item in queries:
                query |= item
            qs = models.Course.objects.filter(query)
            return qs

        return qs


# Course Detail
class CourseDetailView(RetrieveAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseModelSerializer
    # permission_classes = [permissions.IsAuthenticated]


# Chapter
# class ChapterListCreateAPIView(ListCreateAPIView):
#     queryset = models.Chapter.objects.all()
#     serializer_class = ChapterModelSerializer
#     # permission_classes = [permissions.IsAuthenticated]


# Chapter Detail
class ChapterDetailView(RetrieveUpdateDestroyAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterModelSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["chapter_duration"] = self.chapter_duration
        print("context----------")
        print(context)
        return context


# Course Chapter
class CourseChapterListAPIView(ListCreateAPIView):
    serializer_class = ChapterModelSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        course_id = self.kwargs["course_id"]
        course = models.Course.objects.get(pk=course_id)
        return models.Chapter.objects.filter(course=course)


# Student view
class StudentListCreateAPIView(ListCreateAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentModelSerializer
    # permission_classes = [permissions.IsAuthenticated]


class StudentRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentModelSerializer
    # permission_classes = [permissions.IsAuthenticated]


class StudentDashboard(RetrieveAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentDashboardSerializer
    # permission_classes = [permissions.IsAuthenticated]


@csrf_exempt
def student_change_password(request, student_id):
    password = request.POST["password"]
    try:
        studentData = models.Student.objects.get(id=student_id)
    except models.Student.DoesNotExist:
        studentData = None
    if studentData:
        models.Student.objects.filter(id=student_id).update(password=password)
        return JsonResponse({"bool": True})
    else:
        return JsonResponse({"bool": False})


@csrf_exempt
def student_login(request):
    email = request.POST["email"]
    password = request.POST["password"]
    try:
        studentData = models.Student.objects.get(email=email, password=password)
    except models.Student.DoesNotExist:
        # return JsonResponse({"error": "Invalid request data."}, status=400)
        studentData = None
    if studentData:
        if not studentData.varify_status:
            return JsonResponse({"bool": False, "msg": "Account is not varidied!!"})
        else:
            if studentData.login_via_otp:
                # Send OTP Email
                otp_digit = randint(100000, 999999)
                send_mail(
                    "Varify account",
                    "Please verufy account.",
                    "rrafi0570@gmail.com",
                    [studentData.email],
                    fail_silently=False,
                    html_message=f"<p>Your OTP is</p><p> {otp_digit} </p>",
                )
                studentData.otp_digit = otp_digit
                studentData.save()
                return JsonResponse(
                    {"bool": True, "student_id": studentData.id, "login_via_otp": True}
                )
            else:
                return JsonResponse(
                    {"bool": True, "student_id": studentData.id, "login_via_otp": False}
                )

    else:
        return JsonResponse({"bool": False})


@csrf_exempt
def varify_student_via_otp(request, student_id):
    otp_digit = request.POST.get("otp_digit")
    varify = models.Student.objects.filter(id=student_id, otp_digit=otp_digit).first()
    if varify:
        models.Student.objects.filter(id=student_id, otp_digit=otp_digit).update(
            varify_status=True
        )
        return JsonResponse({"bool": True, "student_id": varify.id})
    else:
        return JsonResponse({"bool": False})


class StudentEnrollCourseListCreate(ListCreateAPIView):
    queryset = models.StudentCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollSerializer


# Srudent
class StudentFavouriteCourseList(ListCreateAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentFavouriteCoursesSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if "student_id" in self.kwargs:
            student_id = self.kwargs["student_id"]
            student = models.Student.objects.get(pk=student_id)
            return models.StudentFavouriteCourse.objects.filter(
                student=student
            ).distinct()


def fetch_enroll_status(request, student_id, course_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    enrollStatus = models.StudentCourseEnrollment.objects.filter(
        course=course, student=student
    ).count()
    if enrollStatus:
        return JsonResponse({"bool": True})
    else:
        return JsonResponse({"bool": False})


def fetch_favourite_status(request, student_id, course_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    favouriteStatus = models.StudentFavouriteCourse.objects.filter(
        course=course, student=student
    ).first()
    if favouriteStatus and favouriteStatus.status == True:
        return JsonResponse({"bool": True})
    else:
        return JsonResponse({"bool": False})


def remove_favourite_course(request, student_id, course_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    favouriteStatus = models.StudentFavouriteCourse.objects.filter(
        course=course, student=student
    ).delete()
    if favouriteStatus:
        return JsonResponse({"bool": True})
    else:
        return JsonResponse({"bool": False})


class EnrolledStudentList(ListAPIView):
    queryset = models.StudentCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollSerializer

    def get_queryset(self):
        if "course_id" in self.kwargs:
            course_id = self.kwargs["course_id"]
            course = models.Course.objects.get(pk=course_id)
            return models.StudentCourseEnrollment.objects.filter(course=course)

        elif "teacher_id" in self.kwargs:
            teacher_id = self.kwargs["teacher_id"]
            teacher = models.Teacher.objects.get(pk=teacher_id)
            return models.StudentCourseEnrollment.objects.filter(
                course__teacher=teacher
            ).distinct()

        elif "student_id" in self.kwargs:
            student_id = self.kwargs["student_id"]
            student = models.Student.objects.get(pk=student_id)
            return models.StudentCourseEnrollment.objects.filter(
                student=student
            ).distinct()


class CourseRatingListCreate(ListCreateAPIView):
    queryset = models.CourseRating.objects.all()
    serializer_class = CourseRatingSerializer

    # def get_queryset(self):
    #     course_id = self.kwargs["course_id"]
    #     # student_id = self.kwargs["student_id"]
    #     course = models.Course.objects.get(pk=course_id)
    #     return models.CourseRating.objects.filter(course=course)


def fetch_rating_status(request, student_id, course_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    ratingStatus = models.CourseRating.objects.filter(
        course=course, student=student
    ).count()
    if ratingStatus:
        return JsonResponse({"bool": True})
    else:
        return JsonResponse({"bool": False})


# New
class AssignmentListCreate(ListCreateAPIView):
    queryset = models.StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer

    def get_queryset(self):
        student_id = self.kwargs["student_id"]
        teacher_id = self.kwargs["teacher_id"]
        student = models.Student.objects.get(pk=student_id)
        teacher = models.Teacher.objects.get(pk=teacher_id)
        return models.StudentAssignment.objects.filter(student=student, teacher=teacher)


# class AssignmentListCreate(ListCreateAPIView):
#     queryset = models.StudentAssignment.objects.all()
#     serializer_class = StudentAssignmentSerializer

#     def get_queryset(self):
#         student_id = self.kwargs["student_id"]
#         teacher_id = self.kwargs["teacher_id"]
#         student = models.Student.objects.get(pk=student_id)
#         teacher = models.Teacher.objects.get(pk=teacher_id)
#         return models.StudentAssignment.objects.filter(student=student, teacher=teacher)


# class MyAssignmentList(ListCreateAPIView):
#     queryset = models.StudentAssignment.objects.all()
#     serializer_class = StudentAssignmentSerializer

#     def get_queryset(self):
#         student_id = self.kwargs["student_id"]
#         student = models.Student.objects.get(pk=student_id)
#         # update notification
#         models.Notification.objects.filter(
#             student=student, notif_for="student", notif_subject="assignment"
#         ).update(notif_status=True)
#         return models.StudentAssignment.objects.filter(student=student)

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         if serializer.is_valid():
#             # create the student assignment
#             self.perform_create(serializer)
#             # create a new notification
#             student = serializer.validated_data["student"]
#             teacher = serializer.validated_data["teacher"]
#             notif_subject = "assignment"
#             notif_for = "student"
#             models.Notification.objects.create(
#                 student=student,
#                 teacher=teacher,
#                 notif_subject=notif_subject,
#                 notif_for=notif_for,
#                 notif_status=False,
#             )
#             headers = self.get_success_headers(serializer.data)
#             return Response(
#                 serializer.data, status=status.HTTP_201_CREATED, headers=headers
#             )
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MyAssignmentList(ListCreateAPIView):
    queryset = models.StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer

    def get_queryset(self):
        student_id = self.kwargs["student_id"]
        student = models.Student.objects.get(pk=student_id)
        # update notification
        models.Notification.objects.filter(
            student=student, notif_for="student", notif_subject="assignment"
        ).update(notif_status=True)
        return models.StudentAssignment.objects.filter(student=student)


class UpdateAssignment(UpdateAPIView):
    queryset = models.StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer


class NotificationListCreate(ListCreateAPIView):
    queryset = models.Notification.objects.all()
    serializer_class = NotificationSerializer

    def get_queryset(self):
        student_id = self.kwargs["student_id"]
        student = models.Student.objects.get(pk=student_id)
        return models.Notification.objects.filter(
            student=student,
            notif_for="student",
            notif_subject="assignment",
            notif_status=False,
        )


class QuizListCreate(ListCreateAPIView):
    queryset = models.Quiz.objects.all()
    serializer_class = QuizModelSerializer


# Specific Teacher Quiz
class TeacherQuizListCreate(ListCreateAPIView):
    serializer_class = QuizModelSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        teacher_id = self.kwargs["teacher_id"]
        teacher = models.Teacher.objects.get(pk=teacher_id)
        return models.Quiz.objects.filter(teacher=teacher)


class TeacherQuizDetailView(RetrieveUpdateDestroyAPIView):
    queryset = models.Quiz.objects.all()
    serializer_class = QuizModelSerializer
    # permission_classes = [permissions.IsAuthenticated]


# class QuizDetailView(RetrieveUpdateDestroyAPIView):
#     queryset = models.Quiz.objects.all()
#     serializer_class = QuizModelSerializer
#     # permission_classes = [permissions.IsAuthenticated]


class QuizQuestionListCreate(ListCreateAPIView):
    serializer_class = QuestionModelSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        quiz_id = self.kwargs["quiz_id"]
        quiz = models.Quiz.objects.get(pk=quiz_id)
        if "limit" in self.kwargs:
            return models.QuizQuestion.objects.filter(quiz=quiz).order_by("id")[:1]
        elif "question_id" in self.kwargs:
            current_question = self.kwargs["question_id"]
            return models.QuizQuestion.objects.filter(
                quiz=quiz, id__gt=current_question
            ).order_by("id")[:1]
        else:
            return models.QuizQuestion.objects.filter(quiz=quiz)


class CourseQuizListCreate(ListCreateAPIView):
    queryset = models.CourseQuiz.objects.all()
    serializer_class = CourseQuizSerializer

    def get_queryset(self):
        if "course_id" in self.kwargs:
            course_id = self.kwargs["course_id"]
            course = models.Course.objects.get(pk=course_id)
            return models.CourseQuiz.objects.filter(course=course)


class AttemptQuizListCreate(ListCreateAPIView):
    queryset = models.AttemptQuiz.objects.all()
    serializer_class = AttemptQuizSerializer

    def get_queryset(self):
        if "quiz_id" in self.kwargs:
            quiz_id = self.kwargs["quiz_id"]
            quiz = models.Quiz.objects.get(pk=quiz_id)
            return models.AttemptQuiz.objects.filter(quiz=quiz)
            # return models.AttemptQuiz.objects.raw(f'SELECT * FROM main attemptquiz WHERE quiz={int(quiz_id)} GROUP by student_id')


# def fetch_quiz_assign_status(request, quiz_id, course_id):
#     quiz = models.Quiz.objects.filter(id=quiz_id).first()
#     course = models.Course.objects.filter(id=course_id).first()
#     assignStatus = models.CourseQuiz.objects.filter(course=course, quiz=quiz).count()
#     if assignStatus:
#         return JsonResponse({"bool": True})
#     else:
#         return JsonResponse({"bool": False})


def fetch_quiz_attempt_status(request, quiz_id, student_id):
    quiz = models.Quiz.objects.filter(id=quiz_id).first()
    student = models.Student.objects.filter(id=student_id).first()
    attemptStatus = models.AttemptQuiz.objects.filter(
        student=student, question__quiz=quiz
    ).count()
    if attemptStatus > 0:
        return JsonResponse({"bool": True})
    else:
        return JsonResponse({"bool": False})


def fetch_quiz_attempt_questions(request, quiz_id, student_id):
    quiz = models.Quiz.objects.filter(id=quiz_id).first()
    student = models.Student.objects.filter(id=student_id).first()
    total_questions = models.QuizQuestion.objects.filter(quiz=quiz).count()
    total_attempted_questions = (
        models.AttemptQuiz.objects.filter(quiz=quiz, student=student)
        .values("student")
        .count()
    )
    attempted_questions = models.AttemptQuiz.objects.filter(quiz=quiz, student=student)

    total_correct_answer = 0
    for attempt in attempted_questions:
        if attempt.right_ans == attempt.question.right_ans:
            total_correct_answer += 1
    return JsonResponse(
        {
            "total_questions": total_questions,
            "total_attempted_questions": total_attempted_questions,
            "total_correct_answer": total_correct_answer,
        }
    )


# Study Materials
class StudyMaterialListCreate(ListCreateAPIView):
    serializer_class = StudyMaterialSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        course_id = self.kwargs["course_id"]
        course = models.Course.objects.get(pk=course_id)
        return models.StudyMaterial.objects.filter(course=course)


class StudyMaterialRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = models.StudyMaterial.objects.all()
    serializer_class = StudyMaterialSerializer
    # permission_classes = [permissions.IsAuthenticated]


def update_view(request, course_id):
    queryset = models.Course.objects.filter(pk=course_id).first()
    queryset.course_view += 1
    queryset.save()
    return JsonResponse({"views": queryset.course_view})


class FaqListView(ListAPIView):
    queryset = models.FAQ.objects.all()
    serializer_class = FAQSerializer


class FlatPagesListView(ListAPIView):
    queryset = FlatPage.objects.all()
    serializer_class = FlatPagesSerializer


class FlatPagesDetailView(RetrieveAPIView):
    queryset = FlatPage.objects.all()
    serializer_class = FlatPagesSerializer


class ContactListCreateView(ListCreateAPIView):
    queryset = models.Contact.objects.all()
    serializer_class = ContactSerializer


@csrf_exempt
def teacher_forgot_password(request):
    email = request.POST.get("email")
    varify = models.Teacher.objects.filter(email=email).first()
    if varify:
        link = f"http://localhost:3000/teacher-change-password/{varify.id}/"
        send_mail(
            "Varify account",
            "Please verufy account.",
            "rrafi0570@gmail.com",
            [email],
            fail_silently=False,
            html_message=f"<p>Your OTP is</p><p> {link} </p>",
        )
        return JsonResponse({"bool": True, "msg": "Please Check Your email."})
    else:
        return JsonResponse({"bool": False, "msg": "Invalid Email"})


@csrf_exempt
def teacher_change_password(request, teacher_id):
    password = request.POST.get("password")
    varify = models.Teacher.objects.filter(id=teacher_id).first()
    if varify:
        models.Teacher.objects.filter(id=teacher_id).update(password=password)
        return JsonResponse({"bool": True, "msg": "Password has been changed!"})
    else:
        return JsonResponse({"bool": False, "msg": "Ooops... Some error occured!!"})


@csrf_exempt
def student_forgot_password(request):
    email = request.POST.get("email")
    varify = models.Student.objects.filter(email=email).first()
    if varify:
        link = f"http://localhost:3000/student-change-password/{varify.id}/"
        send_mail(
            "Varify account",
            "Please verufy account.",
            "rrafi0570@gmail.com",
            [email],
            fail_silently=False,
            html_message=f"<p>Your OTP is</p><p> {link} </p>",
        )
        return JsonResponse({"bool": True, "msg": "Please Check Your email."})
    else:
        return JsonResponse({"bool": False, "msg": "Invalid Email"})


@csrf_exempt
def student_change_password(request, student_id):
    password = request.POST.get("password")
    varify = models.Student.objects.filter(id=student_id).first()
    if varify:
        models.Student.objects.filter(id=student_id).update(password=password)
        return JsonResponse({"bool": True, "msg": "Password has been changed!"})
    else:
        return JsonResponse({"bool": False, "msg": "Ooops... Some error occured!!"})


@csrf_exempt
def save_teacher_student_msg(request, student_id, teacher_id):
    teacher = models.Teacher.objects.get(id=teacher_id)
    student = models.Student.objects.get(id=student_id)
    msg_txt = request.POST.get("msg_txt")
    msg_from = request.POST.get("msg_from")
    msgRes = models.TeacherStudentChat.objects.create(
        teacher=teacher, student=student, msg_txt=msg_txt, msg_from=msg_from
    )

    if msgRes:
        return JsonResponse({"bool": True, "msg": "Message has been sent!"})
    else:
        return JsonResponse({"bool": False, "msg": "Ooops... Someting error occured!!"})


class MessageListView(ListAPIView):
    queryset = models.TeacherStudentChat.objects.all()
    serializer_class = TeacherStudentChatSerializer

    def get_queryset(self):
        teacher_id = self.kwargs["teacher_id"]
        student_id = self.kwargs["student_id"]

        teacher = models.Teacher.objects.get(pk=teacher_id)
        student = models.Student.objects.get(pk=student_id)

        return models.TeacherStudentChat.objects.filter(
            teacher=teacher, student=student
        ).exclude(msg_txt="")


@csrf_exempt
def save_teacher_student_grp_msg(request, teacher_id):
    teacher = models.Teacher.objects.get(id=teacher_id)
    enrolledList = models.StudentCourseEnrollment.objects.filter(
        course__teacher=teacher
    ).distinct()
    msg_txt = request.POST.get("msg_txt")
    msg_from = request.POST.get("msg_from")

    for enrolled in enrolledList:
        msgRes = models.TeacherStudentChat.objects.create(
            teacher=teacher,
            student=enrolled.student,
            msg_txt=msg_txt,
            msg_from=msg_from,
        )

    if msgRes:
        return JsonResponse({"bool": True, "msg": "Message has been sent!"})
    else:
        return JsonResponse({"bool": False, "msg": "Ooops... Someting error occured!!"})


# class MyTeachersList(ListAPIView):
#     queryset = models.Course.objects.all()
#     serializer_class = CourseModelSerializer

#     def get_queryset(self):
#         # if "course_id" in self.kwargs:
#         #     course_id = self.kwargs["course_id"]
#         #     course = models.Course.objects.get(pk=course_id)
#         #     return models.StudentCourseEnrollment.objects.filter(course=course)

#         # elif "teacher_id" in self.kwargs:
#         #     teacher_id = self.kwargs["teacher_id"]
#         #     teacher = models.Teacher.objects.get(pk=teacher_id)
#         #     return models.StudentCourseEnrollment.objects.filter(
#         #         course__teacher=teacher
#         #     ).distinct()

#         if "student_id" in self.kwargs:
#             student_id = self.kwargs["student_id"]
#             student = models.Student.objects.get(pk=student_id)
#             sql = models.StudentCourseEnrollment.objects.filter(
#                 student=student
#             )
#             qs = models.Course.objects(sql=sql)
#             return qs


class MyTeachersList(ListAPIView):
    queryset = models.StudentCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollSerializer2

    def get_queryset(self):
        # if "course_id" in self.kwargs:
        #     course_id = self.kwargs["course_id"]
        #     course = models.Course.objects.get(pk=course_id)
        #     return models.StudentCourseEnrollment.objects.filter(course=course)

        # elif "teacher_id" in self.kwargs:
        #     teacher_id = self.kwargs["teacher_id"]
        #     teacher = models.Teacher.objects.get(pk=teacher_id)
        #     return models.StudentCourseEnrollment.objects.filter(
        #         course__teacher=teacher
        #     ).distinct()

        if "student_id" in self.kwargs:
            student_id = self.kwargs["student_id"]
            student = models.Student.objects.get(pk=student_id)
            return models.StudentCourseEnrollment.objects.filter(
                student=student
            ).distinct()


@csrf_exempt
def save_teacher_student_grp_msg_from_student(request, student_id):
    student = models.Student.objects.get(id=student_id)
    # myCourseList = models.StudentCourseEnrollment.objects.filter(
    #     course__student=student
    # ).distinct()

    msg_txt = request.POST.get("msg_txt")
    msg_from = request.POST.get("msg_from")

    # sql =  f'SELECT * FROM main_course as c, main_studentcourseenrollment as e, main_teacher as t WHERE c.teacher_id=t.id AND e.course_id=c.id AND e.student_id={student_id} GROUP BY c.teacher_id'
    # qs = models.Course.objects.raw(sql)
    courses = models.Course.objects.filter(studentcourseenrollment__student=student).distinct().annotate(
        teacher_id=F('teacher__id')
    )
    # myCourses = qs
    for course in courses:
        msgRes = models.TeacherStudentChat.objects.create(
            teacher=course.teacher,
            student=student,
            msg_txt=msg_txt,
            msg_from=msg_from,
        )

    if msgRes:
        return JsonResponse({"bool": True, "msg": "Message has been sent!"})
    else:
        return JsonResponse({"bool": False, "msg": "Ooops... Someting error occured!!"})
