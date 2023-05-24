from django.urls import path
from . import views

urlpatterns = [
    # teacher
    path("teacher/", views.TeacherListCreateAPIView.as_view()),
    path("teacher/dashboard/<int:pk>", views.TeacherDashboard.as_view()),
    path("teacher/<int:pk>", views.TeacherRetrieveUpdateDestroyAPIView.as_view()),
    path("teacher/change-password/<int:teacher_id>", views.teacher_change_password),
    path("teacher/login/", views.teacher_login),
    path("teacher-forgot-password", views.teacher_forgot_password),
    path("teacher-change-password/<int:teacher_id>/", views.teacher_change_password),
    path("popular-teachers/", views.TeacherListCreateAPIView.as_view()),
    path("student-testimonial/", views.CourseRatingListCreate.as_view()),
    path("varify-student/<int:student_id>", views.varify_student_via_otp),
    path("varify-teacher/<int:teacher_id>", views.varify_teacher_via_otp),
    # Category
    path("category/", views.CategoryListCreateAPIView.as_view()),
    # Course
    path("course/", views.CourseListCreateAPIView.as_view()),
    path("search-courses/<str:searchstring>", views.CourseListCreateAPIView.as_view()),
    path("update-view/<int:course_id>", views.update_view),
    # Course Detail
    path("course/<int:pk>", views.CourseDetailView.as_view()),
    # chapter
    # path("chapter/", views.ChapterListCreateAPIView.as_view()),
    # Specific course chapter
    path("course-chapters/<int:course_id>", views.CourseChapterListAPIView.as_view()),
    # Specific course chapter
    path("chapter/<int:pk>", views.ChapterDetailView.as_view()),
    # Teacher
    path(
        "teacher-courses/<int:teacher_id>",
        views.TeacherCourseListCreateAPIView.as_view(),
    ),
    # Course Detail
    path("teacher-course-detail/<int:pk>", views.TeacherCourseDetailView.as_view()),
    # student
    path("student/", views.StudentListCreateAPIView.as_view()),
    path("student/<int:pk>", views.StudentRetrieveUpdateDestroyAPIView.as_view()),
    path("student/dashboard/<int:pk>", views.StudentDashboard.as_view()),
    path("student/change-password/<int:student_id>", views.student_change_password),
    path("student/login/", views.student_login),
    path("student-forgot-password/", views.student_forgot_password),
    path("student-change-password/<int:student_id>/", views.student_change_password),
    path("student-enroll-course/", views.StudentEnrollCourseListCreate.as_view()),
    path(
        "fetch-enroll-status/<int:student_id>/<int:course_id>",
        views.fetch_enroll_status,
    ),
    path(
        "fetch-all-enrolled-students/<int:teacher_id>",
        views.EnrolledStudentList.as_view(),
    ),
    path(
        "fetch-enrolled-students/<int:course_id>", views.EnrolledStudentList.as_view()
    ),
    path(
        "fetch-enrolled-courses/<int:student_id>", views.EnrolledStudentList.as_view()
    ),
    path(
        "fetch-recommended-courses/<int:studentId>",
        views.CourseListCreateAPIView.as_view(),
    ),
    path("course-rating/", views.CourseRatingListCreate.as_view()),
    path(
        "fetch-rating-status/<int:student_id>/<int:course_id>",
        views.fetch_rating_status,
    ),
    path(
        "student-add-favourite-course/",
        views.StudentFavouriteCourseList.as_view(),
    ),
    path(
        "student-remove-favourite-course/<int:course_id>/<int:student_id>",
        views.remove_favourite_course,
    ),
    path(
        "fetch-favourite-status/<int:student_id>/<int:course_id>",
        views.fetch_favourite_status,
    ),
    path(
        "fetch-favourite-courses/<int:student_id>",
        views.StudentFavouriteCourseList.as_view(),
    ),
    # Student Assignment
    path(
        "student-assignment/<int:teacher_id>/<int:student_id>",
        views.AssignmentListCreate.as_view(),
    ),
    path(
        "my-assignment/<int:student_id>",
        views.MyAssignmentList.as_view(),
    ),
    path(
        "update-assignment/<int:pk>",
        views.UpdateAssignment.as_view(),
    ),
    path(
        "student/fetch-all-notifications/<int:student_id>",
        views.NotificationListCreate.as_view(),
    ),
    path(
        "save-notification/",
        views.NotificationListCreate.as_view(),
    ),
    # Quiz Start
    path(
        "quiz/",
        views.QuizListCreate.as_view(),
    ),
    path("teacher-quiz/<int:teacher_id>", views.TeacherQuizListCreate.as_view()),
    path("teacher-quiz-detail/<int:pk>", views.TeacherQuizDetailView.as_view()),
    # path("quiz/<int:pk>", views.QuizDetailView.as_view()),
    path("quiz-questions/<int:quiz_id>", views.QuizQuestionListCreate.as_view()),
    path(
        "quiz-questions/<int:quiz_id>/<int:limit>",
        views.QuizQuestionListCreate.as_view(),
    ),
    # path("fetch-quiz-assign-status/<int:quiz_id>", views.fetch_quiz_assign_status),
    path("quiz-assign-course/", views.CourseQuizListCreate.as_view()),
    path("fetch-assigned-quiz/<int:course_id>", views.CourseQuizListCreate.as_view()),
    path("attempt-quiz/", views.AttemptQuizListCreate.as_view()),
    path(
        "quiz-questions/<int:quiz_id>/next-question/<int:question_id>",
        views.QuizQuestionListCreate.as_view(),
    ),
    path(
        "fetch-quiz-attempt-status/<int:quiz_id>/<int:student_id>",
        views.fetch_quiz_attempt_status,
    ),
    path("study-materials/<int:course_id>", views.StudyMaterialListCreate.as_view()),
    path("study-material/<int:pk>", views.StudyMaterialRetrieveUpdateDestroy.as_view()),
    path(
        "user/study-materials/<int:course_id>",
        views.StudyMaterialListCreate.as_view(),
    ),
    path(
        "attempted-quiz/<int:quiz_id>",
        views.AttemptQuizListCreate.as_view(),
    ),
    path(
        "fetch-quiz-result/<int:quiz_id>/<int:student_id>",
        views.fetch_quiz_attempt_questions,
    ),
    path(
        "faq/",
        views.FaqListView.as_view(),
    ),
    path(
        "pages/",
        views.FlatPagesListView.as_view(),
    ),
    path(
        "pages/<int:pk>/<str:page_slug>/",
        views.FlatPagesDetailView.as_view(),
    ),
    path(
        "contact/",
        views.ContactListCreateView.as_view(),
    ),
    path(
        "send-message/<int:teacher_id>/<int:student_id>",
        views.save_teacher_student_msg,
    ),
    path(
        "get-messages/<int:teacher_id>/<int:student_id>",
        views.MessageListView.as_view(),
    ),
    path(
        "send-group-message/<int:teacher_id>",
        views.save_teacher_student_grp_msg,
    ),
    path(
        "fetch-my-teachers/<int:student_id>", views.MyTeachersList.as_view()
    ),
     path(
        "send-group-message-from-student/<int:student_id>",
        views.save_teacher_student_grp_msg_from_student,
    ),
]
