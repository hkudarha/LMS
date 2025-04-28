import axios from "axios";

export const fetchTotalStudentsService = async () => {
  try {
    const response = await axios.get("/api/students/total-students");
    return response.data;
  } catch (error) {
    console.error("Error fetching total students:", error);
    return { success: false, message: "Error fetching total students" };
  }
};

export const addStudentService = async (studentData) => {
  try {
    const response = await axios.post("/api/students/add-student", studentData);
    return response.data;
  } catch (error) {
    console.error("Error adding student:", error);
    return { success: false, message: "Error adding student" };
  }
};