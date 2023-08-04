"use client";
import Sidebar from "@/components/sidebar/sidebar";
import React, { useState } from "react";

function Layout({ children }: { children: React.ReactNode }) {
  const [activeMenu, setActiveMenu] = useState(false);
  return (
    <div className="min-h-screen flex">
      <div className="w-[300px] p-2 bg-[#111b21]">
        {/* Sidebar header */}
        <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      </div>
      <div
        onClick={() => setActiveMenu(false)}
        className="w-[calc(100%-300px)] flex flex-col justify-between bg-[#21313b]"
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
