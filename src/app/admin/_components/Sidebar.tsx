"use client";

import { useParams, useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const adminId = params?.id;

  const getCurrentFromPath = () => {
    if (!pathname) return "dashboard";
    if (pathname.endsWith(`/admin/${adminId}`)) return "dashboard";
    if (pathname.endsWith(`/admin/${adminId}/blog`)) return "blog";
    if (pathname.endsWith(`/admin/${adminId}/result`)) return "result";
    if (pathname.endsWith(`/admin/${adminId}/roster`)) return "roster";
    if (pathname.endsWith(`/admin/${adminId}/staff`)) return "staff";
    return "dashboard";
  };

  const [current, setCurrent] = useState(getCurrentFromPath());
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setCurrent(getCurrentFromPath());
  }, [pathname]);

  const handleClick = (page: string) => {
    setCurrent(page);
    setMobileOpen(false);
    if (!adminId) return;

    switch (page) {
      case "dashboard":
        router.push(`/admin/${adminId}`);
        break;
      case "blog":
        router.push(`/admin/${adminId}/blog`);
        break;
      case "result":
        router.push(`/admin/${adminId}/result`);
        break;
      case "roster":
        router.push(`/admin/${adminId}/roster`);
        break;
      case "staff":
        router.push(`/admin/${adminId}/staff`);
        break;
    }
  };

  const navButtons = [
    { name: "dashboard", label: "Dashboard" },
    { name: "blog", label: "Blog Posts" },
    { name: "result", label: "Scrim Results" },
    { name: "roster", label: "Player Roster" },
    { name: "staff", label: "Staff List" },
  ];

  const renderNav = (isMobile?: boolean) => (
    <nav className={`flex flex-col gap-2 ${isMobile ? "mt-10" : "mt-6"}`}>
      {navButtons.map((btn) => (
        <button
          key={btn.name}
          onClick={() => handleClick(btn.name)}
          className={`px-3 py-2 rounded-lg transition w-full text-left ${
            current === btn.name
              ? "bg-[#4b2020]"
              : "text-[#ce8d8d] hover:bg-[#4b2020] hover:text-white"
          }`}
        >
          {btn.label}
        </button>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 hidden md:flex flex-col bg-[#2a1515] border-r border-[#4b2020]">
        <div className="flex flex-col justify-between h-full p-4">
          <div>
            <h1 className="text-lg font-bold">Helm of Hades</h1>
            <p className="text-[#ce8d8d] text-sm">Admin Console</p>
            {renderNav()}
          </div>

          <button className="mt-6 rounded-lg bg-[#b20000] hover:bg-[#8a0000] py-2 font-bold">
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded bg-[#2a1515] border border-[#4b2020] text-white flex flex-col justify-between h-5 w-6"
        >
          <span className="block h-0.5 w-full bg-white"></span>
          <span className="block h-0.5 w-full bg-white"></span>
          <span className="block h-0.5 w-full bg-white"></span>
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#2a1515] border-r border-[#4b2020] z-50 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-between h-full p-4">
          <div>
            {/* Close Button */}
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-bold">Helm of Hades</h1>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-white text-xl font-bold"
              >
                ×
              </button>
            </div>
            <p className="text-[#ce8d8d] text-sm mt-1">Admin Console</p>
            {renderNav(true)}
          </div>

          <button className="mt-6 rounded-lg bg-[#b20000] hover:bg-[#8a0000] py-2 font-bold">
            Logout
          </button>
        </div>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 w-20 h-20 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
