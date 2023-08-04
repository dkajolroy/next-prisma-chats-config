"use client";
import TabButton from "@/components/global/TabButton";
import { IconGoogle } from "@/source/assets/IconSvg";
import { ICONS } from "@/source/constant/icons";
import Lottie from "lottie-react";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import SignIn from "./SignIn";
import SignUp from "./signUp";

interface Props {
  searchParams: { callbackUrl: string; error: "CredentialsSignin" };
}
function Auth({ searchParams: { callbackUrl, error } }: Props) {
  // Form active state
  // error: 'CredentialsSignin'}
  useEffect(() => {
    if (error) {
      toast.error(
        error === "CredentialsSignin"
          ? "Invalid Your credentials !"
          : "Something want wrong",
        {
          style: {
            background: "#1f2c32",
            color: "white",
          },
        }
      );
    }
  }, [error]);

  const [activeForm, setActiveForm] = useState<{
    active: Boolean;
    formType: "LOGIN" | "REGISTER";
  }>({ active: false, formType: "LOGIN" });

  // Submit Login form
  function handleLogin() {
    signIn("google", { callbackUrl: callbackUrl }); // Authentication with Provider
  }

  return (
    <div className="bg-[#111b21]">
      <div className="container">
        <div className="lg:w-1/5 md:w-2/5 sm:w-3/6 mx-auto flex-col flex min-h-screen justify-center ">
          {/* Logo  */}
          <div className="flex items-center transition justify-center gap-2">
            <div className="min-w-[100px] min-h-[100px]">
              <Lottie animationData={ICONS.logo} loop={true} />
            </div>
            <h2 className="text-3xl text-white font-medium">Whatsapp</h2>
          </div>
          {/* Auth option */}
          <div className="flex w-full flex-col items-center">
            {activeForm.active && (
              <div className="flex mt-4 w-full flex-col gap-2 items-center">
                <div className="flex gap-2 w-full">
                  <TabButton
                    title="Login"
                    activeType="LOGIN"
                    setActiveForm={setActiveForm}
                    activeForm={activeForm}
                  />
                  <TabButton
                    activeType="REGISTER"
                    title="Register"
                    setActiveForm={setActiveForm}
                    activeForm={activeForm}
                  />
                </div>
                <div className="flex w-full flex-col gap-1">
                  {activeForm.formType === "REGISTER" ? (
                    <SignUp setActiveForm={setActiveForm} />
                  ) : (
                    <SignIn callbackUrl={callbackUrl} />
                  )}
                </div>
              </div>
            )}

            {/* Provider Auth  */}
            {activeForm.formType === "LOGIN" || !activeForm.active ? (
              <div className="flex  justify-center mt-5">
                <div className="bg-gradient-to-r from-cyan-600 to-[#4bd360]  p-[2px] rounded">
                  <div className="bg-[#111b21] z-20 after:absolute after:h-full after:bg-gradient-to-r after:from-cyan-800 after:to-[#2a8337] after:top-0 after:left-0 after:-z-10 relative after:w-0 after:hover:w-full after:transition-all after:origin-left">
                    <button
                      onClick={handleLogin}
                      className="outline-none text-sm flex items-center active:bg-black gap-4 w-full rounded justify-center py-[6px] px-4  border-none text-white"
                    >
                      Login with
                      <div className="flex  items-center gap-1">
                        <IconGoogle />
                        Google
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            <button
              onClick={() =>
                setActiveForm((s) => ({ ...s, active: !s.active }))
              }
              className="outline-none my-2 hover:text-[#4bd360] transition  text-white font-light text-sm "
            >
              {activeForm.active ? "Back" : "Or Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
