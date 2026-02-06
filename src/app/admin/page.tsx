"use client";

import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      if (!session) {
        setLoading(false);
        return;
      }

      const res = await fetch("/api/admin/check");
      const data = await res.json();

      if (data.authorized) {
        setAuthorized(true);
      }

      setLoading(false);
    }

    checkAdmin();
  }, [session]);

  return (
    <div className="min-h-screen w-full bg-[#1a0b0b] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-20 py-4 border-b border-[#b20000]/30 bg-[#150707]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#b20000] text-4xl">
            shield
          </span>
          <h2 className="text-white text-xl font-bold tracking-tight">
            Helm of Hades
          </h2>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[440px] flex flex-col gap-6">
          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-white text-4xl font-bold tracking-tight">
              Admin Portal
            </h1>
            <p className="text-gray-400 text-sm">
              Secure authorization required for access
            </p>
          </div>

          {/* Card */}
          <div className="bg-[#2a1212] border border-[#b20000]/40 rounded-xl p-8 shadow-2xl shadow-black/50 flex flex-col gap-4">
            {/* Case 1: Not logged in */}
            {!session && (
              <>
                <p className="text-gray-300 text-sm text-center">
                  You must login with Discord to continue.
                </p>

                <button
                  onClick={() => signIn("discord")}
                  className="w-full py-3 rounded-lg bg-[#b20000] text-white font-bold hover:bg-red-700 transition"
                >
                  Login with Discord
                </button>
              </>
            )}

            {/* Case 2: Logged in, checking DB */}
            {session && loading && (
              <p className="text-gray-400 text-center">
                Checking authorization...
              </p>
            )}

            {/* Case 3: Logged in but NOT authorized */}
            {session && !loading && !authorized && (
              <>
                <p className="text-red-500 font-semibold text-center">
                  Not Authorized
                </p>
                <p className="text-gray-400 text-sm text-center">
                  Your Discord account is not allowed to access the admin panel.
                </p>
              </>
            )}

            {/* Case 4: Logged in + Authorized */}
            {session && !loading && authorized && (
              <>
                <p className="text-green-400 font-semibold text-center">
                  Access Granted
                </p>

                <button
                  onClick={() =>
                    router.push(`/admin/${session.user.discordId}`)
                  }
                  className="w-full py-3 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition"
                >
                  Continue to Dashboard
                </button>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
