import React from "react";

import { useRouter } from "next/navigation";
import { BookOpenText } from "lucide-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { formatDistance } from "date-fns";

const ArticleCard = ({ blog }) => {
  const router = useRouter();
  return (
    <div
      className="relative shadow-lg  w-full rounded-xl p-5 border-t-[20px]  max-h-screen overflow-hidden"
      style={{ borderColor: blog?.themeColor }}
    >
      <Card className="border-0">
        <CardHeader>
          <CardTitle className="my-5 line-clamp-3">{blog.title}</CardTitle>
          <CardDescription className="my-5 line-clamp-2">
            {blog.subtitle}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <p className="text-sm text-gray-500 w-full float-right">
            Updated :{" "}
            {formatDistance(new Date(blog.updatedAt), new Date(), {
              addSuffix: true,
            })}
          </p>
        </CardFooter>
      </Card>
      <div className="absolute inset-0 w-full bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="flex space-x-4 m-8 scale-75 md:scale-100">
          <div className="flex flex-col items-center">
            <Button
              className="my-2 text-sm"
              onClick={() => router.push(`/article/${blog._id}`)}
            >
              <BookOpenText className="h-[1.2rem] w-[1.2rem] transition-all dark:rotate-0 dark:scale-100" />
              Read it
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
