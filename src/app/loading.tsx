import Loader from "src/components/Loader";
import React from "react";

const loading = () => {
  return (
    <div className="mx-auto  h-screen flex flex-col gap-2 justify-center items-center">
      <Loader />
    </div>
  );
};

export default loading;
