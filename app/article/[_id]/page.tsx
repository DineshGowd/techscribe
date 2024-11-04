import React from "react";

import { getBlogFromDB } from "@/actions/blog";
import BlogPreview from "@/components/preview/BlogPreview";

export async function generateMetadata({ params }) {
  const blog = await getBlogFromDB(params._id);

  return {
    title: `${blog.title} - Blog`,
    description: blog.summary,
    openGraph: {
      title: `${blog.title} - Blog`,
      description: blog.summary,
      images: ["/logo.svg"],
    },
  };
}

const BlogPage = async ({ params }) => {
  const blog = await getBlogFromDB(params._id);
  console.log("🚀 ~ BlogPage ~ blog:", blog);
  return (
    <div className="mt-[20px] mx-[10%] md:mx-[25%]">
      <BlogPreview blog={blog} />
    </div>
  );
};

export default BlogPage;
