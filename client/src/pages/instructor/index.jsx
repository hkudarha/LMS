import InstructorCourses from "@/components/instructor-view/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import { fetchInstructorCourseListService } from "@/services";
import { Tabs } from "@radix-ui/react-tabs";
import { BarChart, Book, LogOut } from "lucide-react";
import { useContext, useEffect, useState } from "react";

function InstructorDashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { resetCredentials } = useContext(AuthContext);

  const { instructorCoursesList, setInstructorCoursesList } =
    useContext(InstructorContext);

  async function fetchAllCourses() {
    const response = await fetchInstructorCourseListService();

    console.log(response);

    if (response?.success) setInstructorCoursesList(response?.data);
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const menuItem = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      Component: <InstructorDashboard />,
    },
    {
      icon: Book,
      label: "Cources",
      value: "cources",
      Component: <InstructorCourses listOfCourses={instructorCoursesList} />,
    },
  ];

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md hidden md:block relative">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Instructor view</h2>
          <nav>
            {menuItem.map((menuItem) => (
              <Button
                className="w-full justify-start mb-2"
                key={menuItem.value}
                variant={activeTab === menuItem.value ? "secondary" : "ghost"}
                onClick={() => setActiveTab(menuItem.value)}
              >
                <menuItem.icon className="mr-2 h-4 w-4" />
                {menuItem.label}
              </Button>
            ))}
          </nav>
        </div>
        
        {/* Logout button positioned at the bottom */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <Button
            className="w-full justify-start bg-red-500 hover:bg-red-600 text-white"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* <h1 className="text-3xl font-bold mb-8">Dashboard</h1> */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItem.map((menuItem) => (
              <TabsContent value={menuItem.value} key={menuItem.value}>
                {menuItem.Component}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default InstructorDashboardPage;