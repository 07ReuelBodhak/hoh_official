"use client";

import React, { useState } from "react";
import Notification from "@/components/NotificationProps";

export default function BlogForm() {
  const [blog, setBlog] = useState<{
    title: string;
    content: string;
    image: File | null;
  }>({
    title: "",
    content: "",
    image: null,
  });
  const [notification, setNotification] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const clearNotification = (ms = 4000) => {
    setTimeout(() => setNotification(null), ms);
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "Upload failed");
      throw new Error(errText || "Image upload failed");
    }

    const data = await res.json();

    if (!data?.url) throw new Error("No URL returned from upload");

    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setNotification(null);

    try {
      let imageUrl = "";

      if (blog.image) {
        imageUrl = await uploadImage(blog.image);
      }

      const res = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: blog.title,
          content: blog.content,
          coverImage: imageUrl,
        }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "Failed to create post");
        throw new Error(errText || "Failed to create post");
      }

      setNotification("Blog post published successfully.");
      // reset form
    } catch (err: any) {
      setNotification(
        typeof err === "string" ? err : err?.message || "An error occurred",
      );
    } finally {
      setLoading(false);
      clearNotification();
      setBlog({
        title: "",
        content: "",
        image: null,
      });
    }
  };

  return (
    <div className="bg-[#2a1515] rounded-xl border border-[#4b2020]/50 p-6 shadow-sm">
      {notification && <Notification message={notification} />}
      <h3 className="text-white text-xl font-bold mb-6">Create New Post</h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-[#ce8d8d] text-sm font-bold mb-2 uppercase tracking-wide">
            Featured Image
          </label>

          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#4b2020] border-dashed rounded-lg cursor-pointer bg-[#4b2020]/20 hover:bg-[#4b2020]/30 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <span className="material-symbols-outlined text-[#ce8d8d] text-3xl mb-2">
                  cloud_upload
                </span>

                <p className="text-sm text-[#ce8d8d]">
                  <span className="font-bold">Click to upload</span> or drag and
                  drop
                </p>

                <p className="text-xs text-[#ce8d8d]/60">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>

                {/* Show selected file name */}
                {blog.image && (
                  <p className="text-xs text-green-400 mt-2">
                    Selected: {blog.image.name}
                  </p>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setBlog({
                    ...blog,
                    image: e.target.files?.[0] || null,
                  })
                }
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-[#ce8d8d] text-sm font-bold mb-2 uppercase tracking-wide">
            Post Title
          </label>

          <input
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            className="w-full bg-[#240f0f] border border-[#4b2020] rounded-lg px-4 py-2.5 text-white placeholder-[#ce8d8d]/30 focus:border-[#b20000] focus:ring-1 focus:ring-[#b20000] transition-colors"
            placeholder="Enter an engaging title..."
            type="text"
          />
        </div>

        <div>
          <label className="block text-[#ce8d8d] text-sm font-bold mb-2 uppercase tracking-wide">
            Content
          </label>

          <textarea
            value={blog.content}
            onChange={(e) => setBlog({ ...blog, content: e.target.value })}
            className="w-full bg-[#240f0f] border border-[#4b2020] rounded-lg px-4 py-3 text-white placeholder-[#ce8d8d]/30 focus:border-[#b20000] focus:ring-1 focus:ring-[#b20000] transition-colors h-40 resize-none"
            placeholder="Write your content here..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            className="px-6 py-2 rounded-lg bg-[#b20000] hover:bg-[#8a0000] text-white shadow-lg shadow-[#b20000]/20 transition-colors text-sm font-bold tracking-wide flex items-center gap-2"
            type="submit"
            disabled={loading}
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            {!loading ? <p>Publish Post</p> : <p>Uploading...</p>}
          </button>
        </div>
      </form>
    </div>
  );
}
