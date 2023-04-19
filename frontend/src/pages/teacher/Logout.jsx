import React from "react";

const TeacherLogout = () => {
  localStorage.removeItem("teacherLoginStatus");
  window.location.href = "/teacher-login";
};

export default TeacherLogout;
