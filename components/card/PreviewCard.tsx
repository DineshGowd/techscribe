import React from "react";

import { useBlog } from "@/context/blog";

import BlogPreview from "../preview/BlogPreview";
import { ScrollArea } from "@/components/ui/scroll-area";

const PreviewCard = () => {
  const { blog } = useBlog();
  return (
    <ScrollArea
      className="shadow-lg max-h-screen w-full rounded-xl p-5 border-t-[20px] overflow-y-auto"
      style={{ borderColor: blog?.themeColor }}
    >
      <BlogPreview blog={blog} />
    </ScrollArea>
  );
};

export default PreviewCard;
