"use client";
import BlogCard from "@/components/card/BlogCard";
import SkeletonCard from "@/components/card/SkeletonCard";
import { BlogState, useBlog } from "@/context/blog";
import { useEffect } from "react";

export default function Dashboard() {
  const { blogs, getUserBlogs }: any = useBlog();

  useEffect(() => {
    getUserBlogs();
  }, []);
  if (blogs?.length === 0) return <div>No Article</div>;

  if (!blogs?.length)
    return (
      <div>
        <p className="text-center my-5">Loading...</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3d gap-4 m-5 px-5">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 px-5">
      {blogs?.map((blog: BlogState) => (
        <BlogCard key={blog?._id} blog={blog} />
      ))}
    </div>
  );
}
