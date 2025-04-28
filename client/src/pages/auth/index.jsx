import CommonForm from "@/components/common-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInFormControls, signUpFormControls } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { GraduationCap } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export async function registerService(userData) {
  const response = await axios.post("http://localhost:5000/api/register", userData);
  return response.data;
}

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const [signUpFormData, setSignUpFormData] = useState({
    userName: "",
    userEmail: "",
    password: "",
  });

  const {
    signInFormData,
    setSignInFormData,
    handleLoginUser
  } = useContext(AuthContext);

  async function handleRegisterUser(event) {
    event.preventDefault();
    console.log("signUpFormData:", signUpFormData); // Debugging
    try {
      await registerService(signUpFormData); // Call your API service
      alert("Registration successful!");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message); // Show the error message from the backend
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setSignUpFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleTabChange(value) {
    setActiveTab(value);
  }

  function checkIfSignInFormIsValid() {
    return (
      signInFormData &&
      signInFormData.userEmail !== "" &&
      signInFormData.password !== ""
    );
  }

  function checkIfSignUnFormIsValid() {
    return (
      signUpFormData &&
      signUpFormData.userName !== "" &&
      signUpFormData.userEmail !== "" &&
      signUpFormData.password !== ""
    );
  }

  // console.log(signInFormData);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14  flex items-center border-b">
        <Link to={"/"} className="flex items-center justify-center ">
          <GraduationCap className="h-8 w-8 mr-4 " />
          <span className="font-extrabold text-xl ">LMS LEARN</span>
        </Link>
      </header>

      <div className="flex items-center justify-center min-h-screen bg-background ">
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Sign in to your Account </CardTitle>
                <CardDescription>
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signInFormControls}
                  buttonText={"Sign In"}
                  formData={signInFormData}
                  setFormData={setSignInFormData}
                  isButtonDisabled={!checkIfSignInFormIsValid()}
                  handleSubmit={handleLoginUser}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Create a new Account </CardTitle>
                <CardDescription>
                  Enter your details to get started
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signUpFormControls}
                  formData={signUpFormData}
                  setFormData={setSignUpFormData}
                  handleSubmit={handleRegisterUser}
                />
              </CardContent>
            </Card>
          </TabsContent> 
        </Tabs>
      </div>
    </div>
  );
}

export default AuthPage;

// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');

// app.use(bodyParser.json());

// // Default route for the root path
// app.get('/', (req, res) => {
//   res.send('Welcome to the API');
// });

// app.post('/api/register', (req, res) => {
//   const { userName, userEmail, password } = req.body;

//   // Example logic to check if the user already exists
//   const userExists = false; // Replace with actual database check
//   if (userExists) {
//     return res.status(400).json({ success: false, message: 'User name or user email already exists' });
//   }

//   // Save the user to the database (mock example)
//   res.status(200).json({ success: true, message: 'User registered successfully' });
// });

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
