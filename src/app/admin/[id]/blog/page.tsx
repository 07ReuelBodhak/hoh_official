"use client";
import React from "react";

import BlogForm from "./_components/BlogForm";
import BlogTable from "./_components/BlogTable";

export default function AdminBlog() {
  return (
    <div className="flex h-screen w-full">
      <main className="flex flex-1 flex-col h-full overflow-hidden bg-[#f8f5f5] dark:bg-[#240f0f] relative">
        <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin scrollbar-thumb-[#4b2020] scrollbar-track-transparent flex flex-col gap-8">
          <div className="">
            <BlogForm />
          </div>

          <BlogTable />
        </div>
      </main>
    </div>
  );
}
