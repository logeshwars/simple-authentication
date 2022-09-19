import React from "react";

import Lottie from "react-lottie";
import login from "../lottiefiles/loading.json";
function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: login,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex justify-center items-center w-full h-full absolute top-0 right-0 bg-slate-100 z-10">
      <div className="flex items-center flex-col">
        <Lottie options={defaultOptions} height={300} width={300} />
        <label className="text-blue-500 font-bold text-2xl">Loading</label>
      </div>
    </div>
  );
}

export default Loading;
