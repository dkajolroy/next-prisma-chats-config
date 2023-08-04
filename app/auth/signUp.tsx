'"use client";';
import TextInput from "@/components/global/TextInput";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-hot-toast";

interface Response {
  data: {
    message: string;
    success?: boolean;
  };
}
interface Props {
  setActiveForm: Dispatch<
    SetStateAction<{
      active: Boolean;
      formType: "LOGIN" | "REGISTER";
    }>
  >;
}
function SignUp({ setActiveForm }: Props) {
  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function submit() {
    // formData axios submit
    const { data }: Response = await axios.post("/api/user", formData);
    console.log(data);
    if (!data.success) {
      toast.error(data.message, {
        style: {
          background: "#1f2c32",
          color: "white",
        },
      });
    } else {
      toast.success(data.message, {
        style: {
          background: "#1f2c32",
          color: "white",
        },
      });
      setActiveForm((s) => ({ ...s, formType: "LOGIN" }));
    }
  }
  return (
    <>
      <label className="flex flex-col">
        <span className="text-emerald-500 text-sm">Full name</span>
        <TextInput
          placeholder="Name"
          onChange={(e) => setFormData((s) => ({ ...s, name: e.target.value }))}
        />
      </label>
      <label className="flex flex-col">
        <span className="text-emerald-500 text-sm">Email</span>
        <TextInput
          placeholder="Email"
          onChange={(e) =>
            setFormData((s) => ({ ...s, email: e.target.value }))
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
        Sign up
      </button>
    </>
  );
}

export default SignUp;
