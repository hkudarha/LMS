const express = require("express");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
app.use(express.json());

// Use the student routes
app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});