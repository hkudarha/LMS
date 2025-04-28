import { courseCategories } from "@/config";
import banner from "../../../../public/background-removed (2).png";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { StudentContext } from "@/context/student-context";
import { useEffect } from "react";
import { fetchStudentViewCourseListService } from "@/services";

function StudentHomePage() {
  const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  async function fetchAllStudentViewCourses() {
    const response = await fetchStudentViewCourseListService();

    if (response?.success) {
      console.log("Student View Courses List", response?.data);
      setStudentViewCoursesList(response?.data);
    }
  }

  useEffect(() => {
    fetchAllStudentViewCourses();
  }, []);

  const filteredCourses = selectedCategories.length > 0
    ? studentViewCoursesList?.filter((course) => 
        selectedCategories.includes(course.category)
      )
    : studentViewCoursesList;

  const handleCategoryClick = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleRemoveFilters = () => {
    setSelectedCategories([]);
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    if (course.curriculum && course.curriculum.length > 0) {
      setSelectedLecture(course.curriculum[0]);
    }
  };

  const closeCourseView = () => {
    setSelectedCourse(null);
    setSelectedLecture(null);
  };

  const handleLectureClick = (lecture) => {
    setSelectedLecture(lecture);
  };

  const handlePreviousLecture = () => {
    if (!selectedCourse?.curriculum || !selectedLecture) return;

    const currentIndex = selectedCourse.curriculum.findIndex(
      (lecture) => lecture._id === selectedLecture._id
    );

    if (currentIndex > 0) {
      setSelectedLecture(selectedCourse.curriculum[currentIndex - 1]);
    }
  };

  const handleNextLecture = () => {
    if (!selectedCourse?.curriculum || !selectedLecture) return;

    const currentIndex = selectedCourse.curriculum.findIndex(
      (lecture) => lecture._id === selectedLecture._id
    );

    if (currentIndex < selectedCourse.curriculum.length - 1) {
      setSelectedLecture(selectedCourse.curriculum[currentIndex + 1]);
    }
  };

  const getSelectedCategoriesLabel = () => {
    if (selectedCategories.length === 0) return "Featured Courses";
    if (selectedCategories.length === 1) {
      const category = courseCategories.find(c => c.id === selectedCategories[0]);
      return `${category?.label} Courses`;
    }
    return `${selectedCategories.length} Categories Selected`;
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8">
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-3xl font-bold mb-4">Learning that gets you</h1>
          <p>Skills for your present and your future. Get started with Us.</p>
        </div>
        <div className="lg:w-full mb-8 lg:mb-0">
          <img
            src={banner}
            width={600}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg"
            alt="Learning banner"
          />
        </div>
      </section>

      <section className="py-8 px-4 lg:px-8 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Course Categories</h2>
          {selectedCategories.length > 0 && (
            <Button
              variant="ghost"
              onClick={handleRemoveFilters}
              className="text-blue-600 hover:text-blue-800"
            >
              Remove Filters
            </Button>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {courseCategories.map((categoryItem) => (
            <Button
              className="justify-start"
              variant={
                selectedCategories.includes(categoryItem.id) 
                  ? "default" 
                  : "outline"
              }
              key={categoryItem.id}
              onClick={() => handleCategoryClick(categoryItem.id)}
            >
              {categoryItem.label}
              {selectedCategories.includes(categoryItem.id) && (
                <span className="ml-2">✓</span>
              )}
            </Button>
          ))}
        </div>
      </section>

      <section className="py-12 px-4 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">
          {getSelectedCategoriesLabel()}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses && filteredCourses.length > 0 ? (
            filteredCourses.map((courseItem) => (
              <div
                className="border rounded-lg overflow-hidden shadow cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleCourseClick(courseItem)}
                key={courseItem._id}
              >
                <img
                  src={courseItem?.image}
                  width={300}
                  height={150}
                  className="w-full h-40 object-cover"
                  alt={courseItem.title}
                />
                <div className="p-3">
                  <h3 className="font-bold mb-2">{courseItem.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    {courseItem.instructorName}
                  </p>
                  <p className="font-bold text-[16px]">${courseItem.pricing}</p>
                </div>
              </div>
            ))
          ) : (
            <h1>No Courses Found</h1>
          )}
        </div>
      </section>

      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">{selectedCourse.title}</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeCourseView}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              <div className="w-2/3 p-4 border-r">
                {selectedLecture ? (
                  <div className="h-full flex flex-col">
                    <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
                      <video
                        controls
                        className="w-full h-full"
                        src={selectedLecture.videoUrl}
                        key={selectedLecture._id}
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold">
                        {selectedLecture.title}
                      </h3>
                      <p className="text-gray-600 mt-2">
                        {selectedCourse.description}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    Select a lecture to view
                  </div>
                )}
              </div>

              <div className="w-1/3 overflow-y-auto">
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-4">Course Curriculum</h3>
                  <div className="space-y-2">
                    {selectedCourse.curriculum &&
                    selectedCourse.curriculum.length > 0 ? (
                      selectedCourse.curriculum.map((lecture, index) => (
                        <div
                          key={lecture._id}
                          className={`p-3 rounded cursor-pointer ${
                            selectedLecture?._id === lecture._id
                              ? "bg-blue-100"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => handleLectureClick(lecture)}
                        >
                          <div className="flex items-center">
                            <span className="mr-3 text-gray-500">
                              {index + 1}.
                            </span>
                            <div>
                              <p className="font-medium">{lecture.title}</p>
                              {lecture.freePreview && (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                  Free Preview
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No curriculum available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {selectedCourse.instructorName} • {selectedCourse.level} level
              </div>
              <div className="flex space-x-2">
                <button
                  className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                  onClick={handlePreviousLecture}
                  disabled={
                    !selectedLecture ||
                    selectedCourse.curriculum.findIndex(
                      (lecture) => lecture._id === selectedLecture._id
                    ) <= 0
                  }
                >
                  &lt; Previous
                </button>
                <button
                  className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                  onClick={handleNextLecture}
                  disabled={
                    !selectedLecture ||
                    selectedCourse.curriculum.findIndex(
                      (lecture) => lecture._id === selectedLecture._id
                    ) >=
                      selectedCourse.curriculum.length - 1
                  }
                >
                  next &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentHomePage;