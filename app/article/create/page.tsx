"use client";
import PreviewCard from "@/components/card/PreviewCard";
import BlogForm from "@/components/blog/BlogForm";

export default function Create() {
  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-y-auto">
      <div className="flex flex-col lg:w-1/2 p-4 lg:order-last lg:flex lg:justify-center lg:items-center">
        <PreviewCard />
      </div>
      <div className="flex flex-col mb-5 md:mb-auto lg:w-1/2 p-4 lg:order-first lg:flex lg:justify-center lg:items-start">
        <BlogForm />
      </div>
    </div>
  );
}
