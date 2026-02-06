"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

import Button from "./ui/Button";
import NavItem from "./ui/NavItem";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname(); // ✅ Current route
  const { data: session } = useSession();

  // ✅ Navigation handler
  const handleNav = (route: string) => {
    router.push(route);
    setIsMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#4b2020] bg-[#230f0f]/95 backdrop-blur-sm">
      <div className="px-4 md:px-10 py-5 mx-auto max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <h2 className="text-white text-xl font-bold uppercase">
          Helm of Hades
        </h2>

        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-1 justify-end gap-8 items-center">
          <nav className="flex items-center gap-9">
            <NavItem
              name="home"
              route="/"
              active={pathname === "/"}
              onNavigate={handleNav}
            />

            <NavItem
              name="team"
              route="/team"
              active={pathname === "/team"}
              onNavigate={handleNav}
            />

            <NavItem
              name="matches"
              route="/matches"
              active={pathname === "/matches"}
              onNavigate={handleNav}
            />

            <NavItem
              name="about"
              route="/about"
              active={pathname === "/about"}
              onNavigate={handleNav}
            />

            <NavItem
              name="community"
              route="/community"
              active={pathname === "/community"}
              onNavigate={handleNav}
            />
          </nav>

          {/* Auth Button */}
          {!session ? (
            <button
              onClick={() => signIn("discord")}
              className="min-w-[140px] rounded-lg h-10 px-4 bg-[#b20000] hover:bg-[#8f0000] text-white font-bold"
            >
              Login with Discord
            </button>
          ) : (
            <button
              onClick={() => signOut()}
              className="min-w-[140px] rounded-lg h-10 px-4 bg-[#b20000] hover:bg-[#8f0000] text-white font-bold"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="lg:hidden bg-[#230f0f] border-t border-[#4b2020] px-4 py-4">
          <nav className="flex flex-col gap-3">
            <NavItem
              name="home"
              route="/"
              active={pathname === "/"}
              onNavigate={handleNav}
            />

            <NavItem
              name="team"
              route="/team"
              active={pathname === "/team"}
              onNavigate={handleNav}
            />

            <NavItem
              name="matches"
              route="/matches"
              active={pathname === "/matches"}
              onNavigate={handleNav}
            />

            <NavItem
              name="about"
              route="/about"
              active={pathname === "/about"}
              onNavigate={handleNav}
            />

            <NavItem
              name="community"
              route="/community"
              active={pathname === "/community"}
              onNavigate={handleNav}
            />

            {/* Auth Button */}
            {!session ? (
              <Button
                variant="primary"
                onClick={() => signIn("discord")}
                className="w-full mt-3"
              >
                Login with Discord
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => signOut()}
                className="w-full mt-3"
              >
                Logout
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
