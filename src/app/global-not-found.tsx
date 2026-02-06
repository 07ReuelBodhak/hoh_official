import "./global.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import BackToHomeButton from "@/components/ui/BackToHomeButton";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "404 – Page Not Found | Helm of Hades",
  description: "This sector of the arena does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#221010] text-white min-h-screen overflow-x-hidden">
        <main className="relative flex min-h-screen items-center justify-center px-4 text-center">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center opacity-20 mix-blend-overlay"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB-8hNZvPZtBlge0nR2na2AZmDv5NvrQ-dz6LsSthEjj69gAISKUINKXW8pWhNtJSIG_XTtNzt3afqKTVj8kjBpbM6CVFdh1FFGWjjGu1W0iTInJmZnqY7gn7ewqkvrsLsrAP7CfmR9QcgSqllbx5opf1DjSLTaccssg_seVxPDI4jvcSrqnVaKBqJHcIIBMReFyMKUyTdVywF4rGusA21dD1RseI-HEcwY1d9A60vHMlX2cjhntfes3XwGsa_-BspPwcojZso11LtW")',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#221010] via-transparent to-[#221010]" />
          </div>

          {/* Content */}
          <section className="relative z-10 flex flex-col items-center gap-8 max-w-[800px]">
            {/* 404 */}
            <div className="relative">
              <h1 className="text-[120px] md:text-[180px] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-[#4a4a4a] glitch-text select-none">
                404
              </h1>

              <span className="absolute -top-4 -right-12 md:-right-20 rotate-12 bg-[#f20d0d] text-white text-xs md:text-sm font-bold px-3 py-1 rounded border border-[#7a0000] uppercase tracking-widest">
                System Failure
              </span>
            </div>

            {/* Message */}
            <div className="space-y-4">
              <p className="text-[#f20d0d] text-xl md:text-2xl font-bold uppercase tracking-[0.2em]">
                Lost in the Void
              </p>
              <p className="text-[#cb9090] text-base md:text-lg max-w-[480px] mx-auto">
                You have wandered into the Underworld. This route does not exist
                or has been corrupted by the Hades protocol.
              </p>
            </div>

            {/* Button */}
            <BackToHomeButton />
          </section>
        </main>
        <Footer />
      </body>
    </html>
  );
}
