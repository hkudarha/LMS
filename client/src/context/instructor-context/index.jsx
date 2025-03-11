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

  const [meadiaUploadProgressPercentage, setMeadiaUploadProgressPercentage] =
    useState(0);

  return (
    <InstructorContext.Provider
      value={{
        courseLandingFormdata,
        setCourseLandingFormdata,
        courseCurriculumFormData,
        setCourseCurriculumFormData,
        mediaUploadProgress,
        setMediaUploadProgress,
        meadiaUploadProgressPercentage,
        setMeadiaUploadProgressPercentage,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
}
