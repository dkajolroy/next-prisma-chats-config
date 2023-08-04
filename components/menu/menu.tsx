import { signOut } from "next-auth/react";
import Link from "next/link";

const Menu = () => {
  return (
    <div className="space-y-1 px-2 pb-3 pt-2">
      <Link
        href={"/profile"}
        className="bg-[#21313b] text-sm text-white block rounded-md px-3 py-2 "
      >
        Your Profile
      </Link>
      <Link
        href="/"
        className="text-gray-300 text-sm hover:bg-[#21313b] hover:text-white block rounded-md px-3 py-2  "
      >
        Settings
      </Link>
      <button
        onClick={() => signOut()}
        className="text-gray-300 text-left text-sm w-full hover:bg-[#21313b] hover:text-white block rounded-md px-3 py-2 "
      >
        Sign out
      </button>
    </div>
  );
};

export default Menu;
