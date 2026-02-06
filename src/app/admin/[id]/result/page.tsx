"use client";
import { useState } from "react";
import ResultForm from "./_components/ResultForm";
import ResultsTable from "./_components/ResultTable";

export default function ResultsPage() {
  return (
    <div className="flex-1 w-[55%] sm:w-[80%] md:w-[83%] lg:w-full overflow-y-auto p-6 md:p-8 scrollbar-thin scrollbar-thumb-[#4b2020] scrollbar-track-transparent bg-[#240f0f] min-h-screen">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8 pb-10">
        <ResultForm />
        <ResultsTable />
      </div>
    </div>
  );
}
