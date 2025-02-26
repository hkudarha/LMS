// const { default: axiosInstance } = require("@/api/axioshInstance");
import axiosInstance from "@/api/axioshInstance";


export async function registerService(formData) {
  const {data} = await axiosInstance.post("/auth/register", {
    ...formData,
    role: "user",
  });

  return data;
}
