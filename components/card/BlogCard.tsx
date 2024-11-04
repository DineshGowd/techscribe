import React from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useBlog } from "@/context/blog";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { formatDistance } from "date-fns";

{
  /* <Link href={`/dashboard/blog/edit/${blog._id}`}> */
}
const BlogCard = ({ blog }) => {
  const router = useRouter();
  const { deleteBlog } = useBlog();
  return (
    <div
      className="relative shadow-lg  w-full rounded-xl p-5 border-t-[20px] h-3/4 max-h-screen overflow-hidden"
      style={{ borderColor: blog?.themeColor }}
    >
      <div className="line-clamp-2">
        <Card className="border-0">
          <CardHeader>
            <CardTitle className="my-5 line-clamp-3">{blog.title}</CardTitle>
            <CardDescription className="my-5 line-clamp-2">
              {blog.subtitle}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <p>
              Updated :{" "}
              {formatDistance(new Date(blog.updatedAt), new Date(), {
                addSuffix: true,
              })}
            </p>
          </CardFooter>
        </Card>
      </div>
      <div className="absolute inset-0 w-full bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="flex space-x-4 m-8 scale-75 md:scale-100">
          <div className="flex flex-col items-center">
            <Image
              alt="Edit Icon"
              src="https://cdn-icons-png.flaticon.com/128/1091/1091669.png"
              width={30}
              height={30}
            />
            <Button
              className="my-2 text-sm"
              onClick={() => router.push(`/dashboard/blog/edit/${blog._id}`)}
            >
              Edit
            </Button>
          </div>
          <div className="flex flex-col items-center">
            <Image
              alt="Download Icon"
              src="https://cdn-icons-png.flaticon.com/128/839/839184.png"
              width={30}
              height={30}
            />
            <Button
              className="my-2 text-sm"
              onClick={() => router.push(`/dashboard/blog/${blog._id}`)}
            >
              Preview
            </Button>
          </div>
          <div className="flex flex-col items-center">
            <Image
              alt="Share Icon"
              src="https://cdn-icons-png.flaticon.com/128/2099/2099122.png"
              width={30}
              height={30}
            />
            <Button
              className="my-2 text-sm"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/blog/${blog?._id}`
                );
                toast.success("Do share with anyone");
              }}
            >
              Share
            </Button>
          </div>
          <div className="flex flex-col items-center">
            <Image
              alt="Edit"
              src="https://cdn-icons-png.flaticon.com/128/2603/2603105.png"
              width={30}
              height={30}
            />
            <Button
              className="my-2 text-sm"
              onClick={() => deleteBlog(blog?._id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
