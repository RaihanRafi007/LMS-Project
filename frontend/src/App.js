import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About";
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
// import Dashboard from "./pages/teacher/teacher dashboard/Dashboard";
// import TeacherDashboard from "./pages/teacher/teacher dashboard/TeacherMyCourses";
// import TeacherDashboard from "./pages/teacher/teacher dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/all-courses" element={<AllCourses />} />
        {/* Chapter */}
        <Route path="/all-chapters" element={<CourseChapter />} />
        <Route path="/all-chapters/:course_id" element={<CourseChapter/>} />

        <Route path="/popular-courses" element={<PopularCourses />} />
        <Route path="/detail/:course_id" element={<CourseDetail />} />
        <Route path="/category/:category_slug" element={<CategoryCourses />} />

        {/* User */}
        <Route path="/user-login" element={<Login />} />
        <Route path="/user-register" element={<Registration />} />

        {/* User Dashboard */}
        <Route path="/user-dashboard" element={<Dashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/favourite-courses" element={<FavouriteCourses />} />
        <Route path="/recommended-courses" element={<RecommendedCourses />} />
        <Route path="/profile-setting" element={<ProfileSetting />} />
        <Route path="/change-password" element={<ChangePassword />} />
        {/* User End*/}

        {/* Teacher  */}
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/teacher-logout" element={<TeacherLogout />} />
        <Route path="/teacher-register" element={<TeacherRegistration />} />
        <Route path="/popular-teachers" element={<PopularTeachers />} />
        <Route path="/teacher/detail/:teacher_id" element={<TeacherDetail />} />
        <Route path="/teacher-skill-courses/:skill_name/:teacher_id" element={<TeacherSkillCourses />} />

        {/* Teacher Dashboard */}
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher-courses" element={<TeacherCourses />} />
        <Route path="/add-courses" element={<TeacherAddChapter />} />
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
        <Route path="/teacher-detail/:teacher_id" element={<TeacherDetail />} />
        <Route path="/add-chapter/:course_id" element={<TeacherAddChapter />} />
        <Route path="/edit-chapter/:chapter_id" element={<EditChapter />} />

        {/* Teacher  */}
      </Routes>
    </Router>
  );
}

export default App;
