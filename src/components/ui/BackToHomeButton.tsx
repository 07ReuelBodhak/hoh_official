"use client";

import { useRouter } from "next/navigation";

export default function BackToHomeButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
    router.refresh(); // forces re-fetch & re-render
  };

  return (
    <button
      onClick={handleClick}
      className="group relative flex items-center justify-center overflow-hidden rounded-lg h-12 px-8 border border-[#f20d0d] text-[#f20d0d] hover:text-white text-sm font-bold uppercase tracking-widest transition-colors duration-300"
    >
      <span className="pointer-events-none absolute inset-0 z-0 bg-[#f20d0d] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />

      <span className="relative z-10">← Return to Gateway</span>
    </button>
  );
}
