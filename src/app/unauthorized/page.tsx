"use client";
import Footer from "@/components/Footer";
import { signIn } from "next-auth/react";

export default function UnauthorizedPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#230f0f] text-white">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#230f0f] via-[#2a1010] to-black opacity-90 z-10" />

        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsr8UZWIPQilVJoe2rJ4PSlYldY25WXHC5uXcudSAGenN8h9xyPUdvsrGCeGUioHhTRpMdud345bhHsCz9VvOal7hozUgcuBJov6M760SsQOXRQYiCTZIV1M-YTQ75yoQD-x-AmQtl4dNLe4OIrJB8LKpd378cc6pxa3G4G7jxEkIwM_6uscuTkN2w-noEE1Ed-xrrbl2ka5YxnLX0LGxq2dEPUHgwkIf67DUEy5VbN4rdr15es0gtMMrps0eEz6_Na2PEHp_BTQgJ"
          alt="Unauthorized Background"
          className="h-full w-full object-cover grayscale opacity-40"
        />
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between border-b border-[#4a2121]/50 bg-[#1a0b0b]/80 backdrop-blur-md px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-3xl text-[#e00606]">
            sports_esports
          </span>

          <h2 className="text-xl font-bold tracking-tight">Helm of Hades</h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-20 flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="relative overflow-hidden rounded-xl border border-[#e00606]/50 bg-[#1a0b0b]/90 p-8 shadow-[0_0_40px_rgba(224,6,6,0.15)] backdrop-blur-xl">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#e00606] to-transparent shadow-[0_0_10px_#e00606]" />

            <div className="flex flex-col items-center text-center gap-6">
              {/* Lock Icon */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#e00606]/20 blur-xl animate-pulse" />

                <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#e00606] bg-[#230f0f] text-[#e00606] shadow-[0_0_15px_rgba(224,6,6,0.4)]">
                  <span className="material-symbols-outlined text-4xl">
                    lock
                  </span>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h1 className="text-3xl font-black uppercase leading-tight tracking-tight">
                  Authorized <br />
                  <span className="text-[#e00606] drop-shadow-[0_0_8px_rgba(224,6,6,0.8)]">
                    Entry Only
                  </span>
                </h1>

                <p className="text-sm font-light leading-relaxed text-white/60 max-w-[280px] mx-auto">
                  This portal is restricted to team members. Please login with
                  Discord to continue.
                </p>
              </div>

              {/* Login Button */}
              <a
                href="/api/auth/signin"
                className="group relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-[#e00606] py-4 px-6 font-bold uppercase tracking-wide text-sm transition-all duration-300 hover:bg-[#ff1f1f] hover:shadow-[0_0_25px_rgba(224,6,6,0.6)]"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => signIn("discord")}
                    className="material-symbols-outlined text-lg"
                  >
                    login
                  </button>
                  Login with Discord
                </div>
              </a>

              {/* Secure Note */}
              <div className="flex items-center gap-2 text-xs text-white/40">
                <span className="material-symbols-outlined text-sm">
                  encrypted
                </span>
                Secure connection via Discord OAuth2
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
