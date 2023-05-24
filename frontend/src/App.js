import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CourseDetail from "./pages/CourseDetail";
import Dashboard from "./pages/user/user dashboard/Dashboard";
import Home from "./pages/Home";
import FavouriteCourses from "./pages/user/user dashboard/FavouriteCourses";
import RecommendedCourses from "./pages/user/user dashboard/RecommendedCourses";
import MyCourses from "./pages/user/user dashboard/MyCourses";
import ProfileSetting from "./pages/user/user dashboard/ProfileSetting";
import ChangePassword from "./pages/user/user dashboard/ChangePassword";
import Login from "./pages/user/Login";
import Registration from "./pages/user/Registration";
import TeacherLogin from "./pages/teacher/Login";
import TeacherRegistration from "./pages/teacher/Registration";
import TeacherDashboard from "./pages/teacher/teacher dashboard/Dashboard";
import TeacherProfileSetting from "./pages/teacher/teacher dashboard/ProfileSetting";
import TeacherChangePassword from "./pages/teacher/teacher dashboard/ChangePassword";
import UserList from "./pages/teacher/teacher dashboard/UserList";
import TeacherDetail from "./pages/teacher/TeacherDetail";
import AllCourses from "./pages/AllCourses";
import PopularCourses from "./pages/PopularCourses";
import PopularTeachers from "./pages/teacher/PopularTeachers";
import CategoryCourses from "./pages/CategoryCourses";
import TeacherLogout from "./pages/teacher/Logout";
import CourseChapter from "./pages/teacher/teacher dashboard/CourseChapter";
import TeacherAddChapter from "./pages/teacher/teacher dashboard/AddChapter";
import EditChapter from "./pages/teacher/teacher dashboard/EditChapter";
import TeacherCourses from "./pages/teacher/teacher dashboard/TeacherCourses";
import EditCourses from "./pages/teacher/teacher dashboard/EditCourse";
import EditCourse from "./pages/teacher/teacher dashboard/EditCourse";
import TeacherSkillCourses from "./pages/TeacherSkillCourses";
import StudentLogout from "./pages/user/Logout";
import TeacherAddCourses from "./pages/teacher/teacher dashboard/AddCourses";
import EnrolledStudents from "./pages/teacher/teacher dashboard/EnrolledStudents";
import AddAssignment from "./pages/teacher/teacher dashboard/AddAssignment";
import ShowAssignment from "./pages/teacher/teacher dashboard/ShowAssignment";
import StudentAssignments from "./pages/user/user dashboard/StudentAssignments";
import AddQuiz from "./pages/teacher/teacher dashboard/AddQuiz";
import AllQuizzes from "./pages/teacher/teacher dashboard/AllQuizzes";
import EditQuiz from "./pages/teacher/teacher dashboard/EditQuiz";
import QuizQuestions from "./pages/teacher/teacher dashboard/QuizQuestion";
import AssignQuiz from "./pages/teacher/teacher dashboard/AssignQuiz";
import CourseQuizList from "./pages/user/user dashboard/CourseQuizList";
import TakeQuiz from "./pages/user/user dashboard/TakeQuiz";
import AddQuizQuestion from "./pages/teacher/teacher dashboard/AddQuizQuestion";
import Search from "./pages/Search";
import StudyMaterials from "./pages/teacher/teacher dashboard/StudyMaterials.jsx";
import AddStudyMaterial from "./pages/teacher/teacher dashboard/AddStudyMaterial";
import UserStudyMaterials from "./pages/user/user dashboard/StudyMaterials";
import AttemptedStudent from "./pages/teacher/teacher dashboard/AttemptedStudent";
import Category from "./pages/Category";
import FAQ from "./pages/FAQ";
import Page from "./pages/Page";
import Contact from "./pages/Contact";
import VarifyTeacher from "./pages/teacher/VarifyTeacher";
import VarifyStudent from "./pages/user/user dashboard/VarifyStudent";
import ForgotPassword from "./pages/teacher/ForgotPassword";
import ForgotChangePassword from "./pages/teacher/ForgotChangePasword";
import UserForgotPassword from "./pages/user/UserForgotPassword";
import UserForgotChangePassword from "./pages/user/UserForgotChangePasword";
import MyTeacherss from "./pages/user/user dashboard/MyTeachers";
// import Dashboard from "./pages/teacher/teacher dashboard/Dashboard";
// import TeacherDashboard from "./pages/teacher/teacher dashboard/TeacherMyCourses";
// import TeacherDashboard from "./pages/teacher/teacher dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-courses" element={<AllCourses />} />
        {/* Chapter */}
        <Route path="/all-chapters" element={<CourseChapter />} />
        <Route path="/all-chapters/:course_id" element={<CourseChapter />} />

        <Route path="/popular-courses" element={<PopularCourses />} />
        <Route path="/detail/:course_id" element={<CourseDetail />} />
        <Route
          path="/course/:category_id/:category_slug"
          element={<CategoryCourses />}
        />
        <Route path="/category/" element={<Category />} />

        {/* User */}
        <Route path="/student-login" element={<Login />} />
        <Route path="/user-forgot-password" element={<UserForgotPassword />} />
        <Route path="/student-change-password/:student_id" element={<UserForgotChangePassword/>} />
        <Route path="/student-logout" element={<StudentLogout />} />
        <Route path="/user-register" element={<Registration />} />
        <Route path="/varify-student/:student_id" element={<VarifyStudent />} />

        {/* User Dashboard */}
        <Route path="/student-dashboard" element={<Dashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/my-teachers" element={<MyTeacherss />} />
        <Route path="/course-quiz/:course_id" element={<CourseQuizList />} />

        <Route path="/favourite-courses" element={<FavouriteCourses />} />
        <Route path="/recommended-courses" element={<RecommendedCourses />} />
        <Route path="/profile-setting" element={<ProfileSetting />} />
        <Route path="/change-password" element={<ChangePassword />} />
        {/* User End*/}

        {/* Teacher  */}
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/teacher-forgot-password" element={<ForgotPassword />} />
        <Route path="/teacher-change-password/:teacher_id" element={<ForgotChangePassword />} />
        <Route path="/teacher-logout" element={<TeacherLogout />} />
        <Route path="/teacher-register" element={<TeacherRegistration />} />
        <Route path="/varify-teacher/:teacher_id" element={<VarifyTeacher />} />
        <Route path="/popular-teachers" element={<PopularTeachers />} />
        <Route path="/teacher/detail/:teacher_id" element={<TeacherDetail />} />
        <Route
          path="/teacher-skill-courses/:skill_name/:teacher_id"
          element={<TeacherSkillCourses />}
        />

        {/* Teacher Dashboard */}
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher-courses" element={<TeacherCourses />} />
        <Route
          path="/enrolled-students/:course_id"
          element={<EnrolledStudents />}
        />
        <Route path="/add-courses" element={<TeacherAddCourses />} />
        <Route path="/edit-course/:course_id" element={<EditCourse />} />
        <Route path="/teacher-users" element={<UserList />} />
        <Route
          path="/teacher-profile-setting"
          element={<TeacherProfileSetting />}
        />
        <Route
          path="/teacher-change-password"
          element={<TeacherChangePassword />}
        />
        <Route
          path="/teacher-detail/:teacher_id/"
          element={<TeacherDetail />}
        />
        <Route path="/add-chapter/:course_id" element={<TeacherAddChapter />} />
        <Route
          path="/add-assignment/:s_id/:teacher_id"
          element={<AddAssignment />}
        />
        <Route
          path="/show-assignment/:s_id/:teacher_id"
          element={<ShowAssignment />}
        />
        <Route path="/my-assignments/" element={<StudentAssignments />} />
        <Route path="/quiz" element={<AllQuizzes />} />
        <Route path="/add-quiz" element={<AddQuiz />} />
        <Route
          path="/add-quiz-question/:quiz_id"
          element={<AddQuizQuestion />}
        />
        <Route path="/edit-quiz/:quiz_id" element={<EditQuiz />} />
        <Route path="/all-questions/:quiz_id" element={<QuizQuestions />} />
        <Route path="/assign-quiz/:course_id" element={<AssignQuiz />} />
        <Route path="/assign-quiz/:course_id" element={<AssignQuiz />} />
        <Route
          path="/attempted-student/:quiz_id"
          element={<AttemptedStudent />}
        />
        <Route path="/take-quiz/:quiz_id" element={<TakeQuiz />} />

        <Route path="/edit-chapter/:chapter_id" element={<EditChapter />} />
        <Route path="/search/:searchstring" element={<Search />} />
        <Route
          path="/study-materials/:course_id"
          element={<StudyMaterials />}
        />
        <Route
          path="/user/study-materials/:course_id"
          element={<UserStudyMaterials />}
        />
        <Route path="/add-study/:course_id" element={<AddStudyMaterial />} />

        {/* Teacher  */}
        <Route path="/faq" element={<FAQ />} />
        <Route path="/page/:page_id/:page_slug" element={<Page />} />
        <Route path="/contact-us" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
