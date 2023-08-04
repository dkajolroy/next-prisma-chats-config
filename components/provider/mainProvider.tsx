"use client";

import { addUser } from "@/slice/userSlice";
import { useSession } from "next-auth/react";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

function MainProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const session = useSession();
  useLayoutEffect(() => {
    if (session.data && session.data.user) {
      const { user } = session.data;
      dispatch(addUser({ user }));
    }
  }, [dispatch, session]);

  return <>{children}</>;
}

export default MainProvider;
