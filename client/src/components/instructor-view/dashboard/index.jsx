import { fetchStudentViewCourseListService } from "@/services";
import {
  fetchTotalStudentsService,
  addStudentService,
} from "@/services/studentService";
import { useContext, useEffect, useState } from "react";
import { StudentContext } from "@/context/student-context";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function InstructorDashboard() {
  const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);
  const [uploadedCoursesCount, setUploadedCoursesCount] = useState(0);
  const [instructorName, setInstructorName] = useState("");
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    fetchAllStudentViewCourses();
    fetchTotalStudents();
  }, []);

  const data = [
    { month: "Jan", value: 3 },
    { month: "Feb", value: 2 },
    { month: "Mar", value: 4 },
    { month: "Apr", value: 3 },
    { month: "May", value: 5 },
    { month: "Jun", value: 4 },
    { month: "Jul", value: 6 },
    { month: "Aug", value: 3 },
    { month: "Sep", value: 4.5 },
    { month: "Oct", value: 5 },
    { month: "Nov", value: 3.5 },
    { month: "Dec", value: 4 },
  ];

  async function fetchAllStudentViewCourses() {
    const response = await fetchStudentViewCourseListService();
    if (response?.success) {
      setStudentViewCoursesList(response?.data);

      const uploadedCourses = response?.data?.filter(
        (course) => course.isPublised
      );
      setUploadedCoursesCount(uploadedCourses?.length || 0);

      if (response?.data?.length > 0) {
        setInstructorName(response.data[0].instructorName || "");
      }
    }
  }

  async function fetchTotalStudents() {
    const response = await fetchTotalStudentsService();
    if (response?.success) {
      setTotalStudents(response.totalStudents);
    }
  }

  async function handleAddStudent() {
    const newStudent = {
      name: "New Student",
      email: `student${Date.now()}@example.com`,
    };
    const response = await addStudentService(newStudent);
    if (response?.success) {
      alert("Student added successfully!");
      fetchTotalStudents(); // Refresh the total student count
    } else {
      console.error(
        "Error adding student:",
        response?.message || "Unknown error"
      );
      alert("Failed to add student");
    }
  }

  return (
    <div className="">
      <h1 className="text-2xl font-bold">
        Welcome back, <span className="text-primary">{instructorName}</span>!
      </h1>
      <p className="text-gray-600 mb-4">
        Manage your courses and track your progress.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-md p-4 text-center">
          <p className="text-gray-600">Courses Uploaded</p>
          <p className="text-3xl font-semibold">{uploadedCoursesCount}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-4 text-center">
          <p className="text-gray-600">Total Students</p>
          <p className="text-3xl font-semibold">{totalStudents}</p>
        </div>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-primary text-white rounded"
        onClick={handleAddStudent}
      >
        Add Student
      </button>
      <div className="chart-container bg-white p-6 rounded-xl m-7">
            <h2 className="text-2xl font-bold mb4">Statistics</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
    </div>
  );
}

export default InstructorDashboard;
