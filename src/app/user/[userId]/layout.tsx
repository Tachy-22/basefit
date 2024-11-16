import React from "react";
import Sidebar from "src/components/Sidebar";
import TopNavbar from "src/components/TopNavbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen max-w-screen w-screen overflow-hidden bg-gradient-to-br bg-[#1e1b32] text-stone-300 ">
      {" "}
      <Sidebar />
      <div className="w-full min-h-full max-h-full h-full  relative">
        <TopNavbar />

        <div className="h-full w-full mx-auto  relative min-h-full max-h-full overflow-y-auto scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
