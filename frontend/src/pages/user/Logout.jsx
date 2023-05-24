import React from "react";

const StudentLogout = () => {
  localStorage.removeItem("studentLoginStatus");
  window.location.href = "/student-login";
};

export default StudentLogout;
