"use client";
import { ICONS } from "@/source/constant/icons";
import Lottie from "lottie-react";

function Home() {
  return (
    <div className="flex h-full flex-col justify-center items-center">
      <>
        <div className="flex items-center transition justify-center gap-2">
          <div className="min-w-[100px] min-h-[100px]">
            <Lottie animationData={ICONS.logo} loop={true} />
          </div>
          <h2 className="text-3xl text-white font-medium">Whatsapp</h2>
        </div>
        <span className="text-gray-300 lg:w-5/12 md:w-5/6 text-center text-sm">
          Send and received message without keeping your phone online. Use
          Whatsapp on up to 4 linked devices and 1 phone at the same time.{" "}
        </span>
      </>
    </div>
  );
}

export default Home;
