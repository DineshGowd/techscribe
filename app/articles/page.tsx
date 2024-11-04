"use client";
import ArticleCard from "@/components/card/ArticleCard";
import SkeletonCard from "@/components/card/SkeletonCard";
import { BlogState, useBlog } from "@/context/blog";

export default function Dashboard() {
  const { allBlogs }: any = useBlog();
  console.log("🚀 ~ Dashboard ~ allBlogs:", allBlogs);
  if (allBlogs?.length === 0) return <div>No Article</div>;

  if (!allBlogs?.length)
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
      {allBlogs?.map((blog: BlogState) => (
        <ArticleCard key={blog?._id} blog={blog} />
      ))}
    </div>
  );
}
