import CourseCurriculum from "@/components/instructor-view/courses/add-new-course/course-curriculum";
import CourseLanding from "@/components/instructor-view/courses/add-new-course/course-landing";
import CourseSettings from "@/components/instructor-view/courses/add-new-course/course-settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent, TabsTrigger } from "@/components/ui/tabs";
import {
  courseCurriculumInitialFormdata,
  courseLandingInitialFormData,
} from "@/config";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import { addNewCourseService } from "@/services";
import { Tabs, TabsList } from "@radix-ui/react-tabs";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddNewCoursePage() {
  const {
    courseLandingFormdata,
    courseCurriculumFormData,
    setCourseLandingFormdata,
    setCourseCurriculumFormData,
    currentEditedCourseId,
    setCurrentEditedCourseId,
  } = useContext(InstructorContext);

  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();
  const params = useParams();

  console.log(params);

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return value === "" || value === null || value === undefined;
  }
  function validateFormData() {
    for (const key in courseLandingFormdata) {
      if (isEmpty(courseLandingFormdata[key])) {
        return false;
      }
    }

    let hasFreePreview = false;

    for (const item of courseCurriculumFormData) {
      if (
        isEmpty(item.title) ||
        isEmpty(item.videoUrl) ||
        isEmpty(item.public_id)
      ) {
        return false;
      }

      if (item.freePreview) {
        hasFreePreview = true; //found at least one freePreview
      }
    }
    return hasFreePreview;
  }

  async function handleCreateCourse() {
    const courseFinalFormData = {
      instructorId: auth?.user?._id,
      instructorName: auth?.user?.userName,
      date: new Date(),
      ...courseLandingFormdata,
      students: [],
      curriculum: courseCurriculumFormData,
      isPublised: true,
    };

    const response = await addNewCourseService(courseFinalFormData);

    if (response?.success) {
      setCourseLandingFormdata(courseLandingInitialFormData);
      setCourseCurriculumFormData(courseCurriculumInitialFormdata);
      navigate(-1);
    }

    console.log(courseFinalFormData, "courseFinalFormData");
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl mb-5 font-extrabold">Create a new course</h1>
        <Button
          disabled={!validateFormData()}
          className="text-sm tracking-wider font-bold px-8"
          onClick={handleCreateCourse}
        >
          Submit
        </Button>
      </div>
      <Card>
        <CardContent>
          <div className="container mx-auto p-4">
            <Tabs defaultValue="curriculum" className="space-y-4">
              <TabsList>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="course-landing-page">
                  Course Loanding Page
                </TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="curriculum">
                <CourseCurriculum />
              </TabsContent>
              <TabsContent value="course-landing-page">
                <CourseLanding />
              </TabsContent>
              <TabsContent value="settings">
                <CourseSettings />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddNewCoursePage;
