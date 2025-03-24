const express = require("express");
const {
  addNewCourse,
  getAllcourses,
  getCourseDetailsByID,
  updateCourseByID,
} = require("../../controllers/instructor-controller/course-controller");

const router = express.Router();

router.post("/add", addNewCourse);
router.get("/get", getAllcourses);
router.get("/get/details/:id", getCourseDetailsByID);
router.put('/update/:id',updateCourseByID);

module.exports = router;
