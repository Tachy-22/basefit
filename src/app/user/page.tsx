import { redirect } from "next/navigation";
const page = () => {
  redirect("/");
  return null;
};

export default page;
