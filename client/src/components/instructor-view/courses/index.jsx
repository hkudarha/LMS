import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


function InstructorCourses() {
    return ( 
        <Card>
            <CardHeader className="flex justify-between flex-row items-center">
                <CardTitle className="text-3xl font-extrabold ">
                    All courses
                </CardTitle>
                <Button className="p-6">
                    Create New Course
                </Button>
            </CardHeader>

            <CardContent>
                <div className="overflow-x-auto">
                    
                </div>
            </CardContent>
        </Card>
     );
}

export default InstructorCourses;