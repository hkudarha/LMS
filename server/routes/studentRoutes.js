const express = require("express");
const router = express.Router();
const Student = require("../models/Student"); // Assuming you have a Student model

// API to get the total number of students
router.get("/total-students", async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments(); // Count all student documents
    res.status(200).json({ success: true, totalStudents });
  } catch (error) {
    console.error("Error fetching total students:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// API to add a new student
router.post("/add-student", async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validate input
    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Name and email are required" });
    }

    // Create a new student
    const newStudent = new Student({ name, email });
    await newStudent.save();

    res.status(201).json({ success: true, message: "Student added successfully" });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;