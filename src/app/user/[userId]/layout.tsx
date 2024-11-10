import React from "react";
import Sidebar from "src/components/Sidebar";
import TopNavbar from "src/components/TopNavbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen max-w-screen overflow-hidden bg-stone-900 text-stone-300 ">
      {" "}
      <Sidebar />
      <div className="w-full min-h-full max-h-full h-full  relative">
        <TopNavbar />

        <div className="h-full w-full mx-auto max-w-[80rem] relative min-h-full max-h-full overflow-y-auto scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
