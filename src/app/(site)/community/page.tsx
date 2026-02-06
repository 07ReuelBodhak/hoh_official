"use client";

import { useEffect, useState } from "react";

type BlogType = {
  _id: string;
  title: string;
  content: string;
  author: string;
  authorPfp: string;
  coverImage?: string;
  createdAt: string;
};

export default function BlogFeedPage() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch Blogs Function
  const fetchBlogs = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/community/blog?page=${page}&limit=5`);
      const data = await res.json();

      if (!res.ok) {
        console.error("API Error:", data);
        setHasMore(false);
        return;
      }

      const newBlogs = Array.isArray(data.blogs) ? data.blogs : [];

      setBlogs((prev) => [...prev, ...newBlogs]);
      setHasMore(Boolean(data.hasMore));

      setPage((prev) => prev + 1);
    } catch (err) {
      console.error("Fetch Failed:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        fetchBlogs();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, hasMore]);

  return (
    <main className="min-h-screen bg-[#230f0f] flex justify-center py-10 px-4">
      <div className="w-full max-w-[650px] flex flex-col gap-8">
        {/* No Blogs */}
        {!loading && blogs.length === 0 && (
          <p className="text-center text-gray-400 text-lg">
            No blogs available.
          </p>
        )}

        {/* Blog Posts */}
        {blogs.map((blog) => (
          <article
            key={blog._id}
            className="rounded-2xl border border-[#4b2020] bg-[#2a1414] shadow-md overflow-hidden"
          >
            {/* Top Author Bar */}
            <div className="flex items-center gap-3 px-5 py-4">
              {/* Avatar */}
              <div
                className="w-11 h-11 rounded-full bg-cover bg-center border border-[#4b2020]"
                style={{
                  backgroundImage: `url(${blog.authorPfp})`,
                }}
              />

              {/* Author Name + Date */}
              <div className="flex flex-col">
                <h3 className="text-white font-semibold text-sm">
                  {blog.author}
                </h3>
                <p className="text-xs text-gray-400">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Cover Image */}
            {blog.coverImage && (
              <div className="w-full aspect-[16/9] bg-black overflow-hidden">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            )}

            {/* Blog Content */}
            <div className="p-5 flex flex-col gap-2">
              {/* Title */}
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {blog.title}
              </h2>

              {/* Preview Content */}
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed line-clamp-3">
                {blog.content}
              </p>
            </div>
          </article>
        ))}

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-400 text-sm">
            Loading more blogs...
          </p>
        )}

        {/* No More Blogs */}
        {!hasMore && blogs.length > 0 && (
          <p className="text-center text-gray-500 text-sm">
            No more blogs to load.
          </p>
        )}
      </div>
    </main>
  );
}
