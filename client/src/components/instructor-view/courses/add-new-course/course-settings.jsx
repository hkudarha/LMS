import MediaProgressBar from "@/components/media-progress-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InstructorContext } from "@/context/instructor-context";
import { mediaUploadService } from "@/services";
import { useContext } from "react";

function CourseSettings() {
  const {
    courseLandingFormdata,
    setCourseLandingFormdata,
    mediaUploadProgress,
    setMediaUploadProgress,
    meadiaUploadProgressPercentage,
    setMeadiaUploadProgressPercentage,
  } = useContext(InstructorContext);

  async function handleImageUploadChange(event) {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      const imageFormData = new FormData();
      imageFormData.append("file", selectedImage);

      try {
        setMediaUploadProgress(true)
        const response = await mediaUploadService(imageFormData, setMeadiaUploadProgressPercentage);

        if (response.success) {
          setCourseLandingFormdata({
            ...courseLandingFormdata,
            image: response.data.url,
          });
          setMediaUploadProgress(false)
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>
      {mediaUploadProgress ? (
          <MediaProgressBar isMediaUploading={mediaUploadProgress}
          progress={meadiaUploadProgressPercentage} />
        ) : null}
      <CardContent>
        {courseLandingFormdata?.image ? (
          <img src={courseLandingFormdata.image} />
        ) : (
          <div className="flex flex-col gap-3">
            <Label>Upload Course Image</Label>
            <Input
              onChange={handleImageUploadChange}
              type="file"
              accept="image/*"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default CourseSettings;
