"use client";
import React from "react";
import "react-quill/dist/quill.bubble.css";

import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const BlogPreview = ({ blog }) => {
  return (
    <>
      <h2
        className="text-3xl md:text-5xl font-bold mb-2"
        style={{ color: blog?.themeColor }}
      >
        {blog?.title}
      </h2>
      <h2 className="text-xl md:text-2xl font-medium text-gray-500">
        {blog?.subtitle}
      </h2>

      <hr
        className="border-[1.5px] my-2"
        style={{ borderColor: blog?.themeColor }}
      />
      <div className="my-5">
        {blog?.summary && (
          <ReactQuill
            theme="bubble"
            placeholder="article"
            value={blog?.summary}
          />
        )}
      </div>
    </>
  );
};

export default BlogPreview;
