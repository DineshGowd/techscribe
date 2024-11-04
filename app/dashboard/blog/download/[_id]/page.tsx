"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";

import BlogCard from "@/components/card/BlogCard";
import { Button } from "@/components/ui/button";
import { useBlog } from "@/context/blog";
import toast from "react-hot-toast";

const DownloadPage = ({ params }) => {
  const { blogs } = useBlog();
  const [currentBlog, setcCurrentBlog]: any = useState();

  useEffect(() => {
    if (blogs && params._id) {
      const blog = blogs.find((r) => r._id === params._id);
      setcCurrentBlog(blog);
    }
  }, [blogs, params._id]);

  return (
    <div className="flex flex-col gap-4 justify-center  items-center min-h-screen m-5 md:m-20 overflow-auto">
      <div className="text-center w-full md:w-1/2">
        <div>
          <h2 className="font-bold text-lg">
            🎉 Congrats ! Your blog is generated
          </h2>
          <p>You can now share , print and download it</p>
        </div>

        <div className="flex justify-center my-5 gap-5 scale-90 md:scale-100">
          <div className="flex flex-col items-center">
            <Image
              src="https://cdn-icons-png.flaticon.com/128/2099/2099122.png"
              width={40}
              height={40}
              alt="Share Icon"
            />
            <Button
              className="my-2"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/blog/${currentBlog?._id}`
                );
                toast.success("Do share with anyone");
              }}
            >
              Share
            </Button>
          </div>
        </div>
        <div>{currentBlog && <BlogCard blog={currentBlog} />}</div>
      </div>
    </div>
  );
};

export default DownloadPage;
