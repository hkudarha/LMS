import {
  courseCurriculumInitialFormdata,
  courseLandingInitialFormData,
} from "@/config";
import { createContext, useState } from "react";

export const InstructorContext = createContext(null);

export default function InstructorProvider({ children }) {
  const [courseLandingFormdata, setCourseLandingFormdata] = useState(
    courseLandingInitialFormData
  );

  const [courseCurriculumFormData, setCourseCurriculumFormData] = useState(
    courseCurriculumInitialFormdata
  );

  const [mediaUploadProgress, setMediaUploadProgress] = useState(false);

  return (
    <InstructorContext.Provider
      value={{
        courseLandingFormdata,
        setCourseLandingFormdata,
        courseCurriculumFormData,
        setCourseCurriculumFormData,
        mediaUploadProgress,
        setMediaUploadProgress,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
}
 