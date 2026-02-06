"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const router = useRouter();

  const params = useParams();
  const adminId = params?.id;

  const [current, setCurrent] = useState("dashboard");

  const handleClick = (page: string) => {
    setCurrent(page);
    if (!adminId) return;

    if (page === "dashboard") router.push(`/admin/${adminId}`);
    if (page === "blog") router.push(`/admin/${adminId}/blog`);
    if (page === "result") router.push(`/admin/${adminId}/result`);
    if (page === "roster") router.push(`/admin/${adminId}/roster`);
    if (page === "staff") router.push(`/admin/${adminId}/staff`);
  };

  return (
    <aside className="w-64 hidden md:flex flex-col bg-[#2a1515] border-r border-[#4b2020]">
      <div className="flex flex-col justify-between h-full p-4">
        {/* Brand */}
        <div>
          <h1 className="text-lg font-bold">Helm of Hades</h1>
          <p className="text-[#ce8d8d] text-sm">Admin Console</p>

          {/* Nav */}
          <nav className="mt-6 flex flex-col gap-2">
            <button
              onClick={() => handleClick("dashboard")}
              className={`px-3 py-2 rounded-lg transition w-full text-left ${
                current === "dashboard"
                  ? "bg-[#4b2020]"
                  : "text-[#ce8d8d] hover:bg-[#4b2020] hover:text-white"
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => handleClick("blog")}
              className={`px-3 py-2 rounded-lg transition w-full text-left ${
                current === "blog"
                  ? "bg-[#4b2020]"
                  : "text-[#ce8d8d] hover:bg-[#4b2020] hover:text-white"
              }`}
            >
              Blog Posts
            </button>

            <button
              onClick={() => handleClick("result")}
              className={`px-3 py-2 rounded-lg transition w-full text-left ${
                current === "result"
                  ? "bg-[#4b2020]"
                  : "text-[#ce8d8d] hover:bg-[#4b2020] hover:text-white"
              }`}
            >
              Scrim Results
            </button>
            <button
              onClick={() => handleClick("roster")}
              className={`px-3 py-2 rounded-lg transition w-full text-left ${
                current === "roster"
                  ? "bg-[#4b2020]"
                  : "text-[#ce8d8d] hover:bg-[#4b2020] hover:text-white"
              }`}
            >
              Player Roster
            </button>
            <button
              onClick={() => handleClick("staff")}
              className={`px-3 py-2 rounded-lg transition w-full text-left ${
                current === "staff"
                  ? "bg-[#4b2020]"
                  : "text-[#ce8d8d] hover:bg-[#4b2020] hover:text-white"
              }`}
            >
              Staff List
            </button>
          </nav>
        </div>

        {/* Logout */}
        <button className="mt-6 rounded-lg bg-[#b20000] hover:bg-[#8a0000] py-2 font-bold">
          Logout
        </button>
      </div>
    </aside>
  );
}
