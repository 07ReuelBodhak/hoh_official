"use client";

import React, { useEffect, useState } from "react";
import Notification from "@/components/NotificationProps";

interface Post {
  _id: string;
  coverImage?: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function BlogTable() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  const [page, setPage] = useState(0);
  const perPage = 5;

  // ✅ Fetch blogs from database
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();

        setPosts(data.blogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const deleteBlog = async (_id: string) => {
    try {
      setDeletingId(_id);

      setNotification("Deleting blog...");

      const res = await fetch(`/api/blog/${_id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        setNotification("❌ Failed to delete blog");
        setTimeout(() => setNotification(null), 3000);
        return;
      }

      setNotification("✅ Blog deleted successfully!");

      setPosts((prev) => prev.filter((post) => post._id !== _id));

      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Delete error:", error);

      setNotification("❌ Something went wrong");
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setDeletingId(null);
    }
  };

  const pages = Math.ceil(posts.length / perPage);

  const paginatedPosts = posts.slice(page * perPage, page * perPage + perPage);

  if (loading) {
    return <p className="text-white">Loading blogs...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {notification && <Notification message={notification} />}
      <h3 className="text-white text-xl font-bold tracking-tight">
        Recent Posts
      </h3>

      <div className="overflow-x-auto rounded-xl border border-[#4b2020]/50 bg-[#2a1515] shadow-sm">
        <table className="w-full text-left text-sm text-[#ce8d8d]">
          <thead className="bg-[#4b2020]/30 text-xs uppercase text-white font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4 w-20">Image</th>
              <th className="px-6 py-4">Title & Content</th>
              <th className="px-6 py-4">Author</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#4b2020]/30">
            {paginatedPosts.map((post) => (
              <tr
                key={post._id}
                className="hover:bg-[#4b2020]/20 transition-colors group"
              >
                {/* Image */}
                <td className="px-6 py-4">
                  <div className="h-12 w-20 rounded overflow-hidden bg-[#4b2020]/50 flex items-center justify-center">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        className="w-full h-full object-cover"
                        alt={post.title}
                      />
                    ) : (
                      <span className="material-symbols-outlined text-[#ce8d8d]">
                        image
                      </span>
                    )}
                  </div>
                </td>

                {/* Title + Content */}
                <td className="px-6 py-4">
                  <div className="flex flex-col max-w-md">
                    <span className="text-white font-bold text-base mb-1">
                      {post.title}
                    </span>
                    <span className="text-[#ce8d8d]/70 text-xs truncate">
                      {post.content}
                    </span>
                  </div>
                </td>

                {/* Author */}
                <td className="px-6 py-4 text-xs text-white">{post.author}</td>

                {/* Date */}
                <td className="px-6 py-4 text-xs font-medium">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => deleteBlog(post._id)}
                      disabled={deletingId === post._id}
                      className="p-1.5 rounded hover:bg-[#fa3838]/20 text-[#ce8d8d] hover:text-[#fa3838] disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {deletingId === post._id ? "hourglass_top" : "delete"}
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="border-t border-[#4b2020]/30 px-6 py-4 bg-[#4b2020]/10 flex justify-between items-center">
          <span className="text-xs text-[#ce8d8d]">
            Showing {page * perPage + 1}-
            {Math.min((page + 1) * perPage, posts.length)} of {posts.length}{" "}
            posts
          </span>

          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded bg-[#4b2020]/20 hover:bg-[#4b2020]/40 text-xs font-bold disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
            >
              Prev
            </button>

            <button
              className="px-3 py-1 rounded bg-[#4b2020]/20 hover:bg-[#4b2020]/40 text-xs font-bold disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(p + 1, pages - 1))}
              disabled={page === pages - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
