"use client";
import TextInput from "@/components/global/TextInput";
import { signIn } from "next-auth/react";
import { useState } from "react";

interface Props {
  callbackUrl: string;
}
function SignIn({ callbackUrl }: Props) {
  // Form data
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  function submit() {
    signIn("credentials", {
      ...formData,
      callbackUrl,
    });
  }

  return (
    <>
      <label className="flex flex-col">
        <span className="text-emerald-500 text-sm">Email/Username</span>
        <TextInput
          placeholder="Username"
          onChange={(e) =>
            setFormData((s) => ({ ...s, username: e.target.value }))
          }
        />
      </label>
      <label className="flex flex-col">
        <span className="text-emerald-500 text-sm">Password</span>
        <TextInput
          placeholder="Password"
          onChange={(e) =>
            setFormData((s) => ({ ...s, password: e.target.value }))
          }
        />
      </label>

      <button
        onClick={submit}
        className={`text-white text-sm w-full hover:opacity-80 transition p-1 mt-2 bg-emerald-600`}
      >
        Sign in
      </button>
    </>
  );
}

export default SignIn;
