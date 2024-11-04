/* eslint-disable */
"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useParams, useRouter } from "next/navigation";

import {
  deleteBlogFromDB,
  getAllBlogsFromDB,
  getBlogFromDB,
  getUserBlogsFromDB,
  saveBlogToDB,
  updateBlogToDB,
} from "@/actions/blog";

const initialState = {
  _id: "",
  title: "",
  subtitle: "",
  address: "",
  startDate: "",
  endDate: "",
  summary: "",
};

export type BlogState = typeof initialState;

const BlogContext: any = React.createContext(initialState);

export function BlogProvider({ children, ...props }: any) {
  const [blog, setBlog] = useState(initialState);
  const [blogs, setBlogs] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [step, setStep] = useState<any>(1);

  const [articleLoading, setArticleLoading] = useState(true);

  const router = useRouter();
  const { _id } = useParams();
  useEffect(() => {
    const savedBlog = localStorage.getItem("blog");
    if (savedBlog) {
      setBlog(JSON.parse(savedBlog));
    }
  }, []);

  useEffect(() => {
    getAllBlogs();
  }, []);

  useEffect(() => {
    if (_id) getBlog(_id);
  }, [_id]);

  const saveBlog = async () => {
    try {
      const data = await saveBlogToDB(blog);
      setBlog(data);
      localStorage.removeItem("blog");
      toast.success("🎉 Blog saved. Keep building");
      router.push(`/dashboard/blog/edit/${data._id}`);
      setStep(2);
    } catch (err) {
      console.error(err);
      toast.error("😥 Failed to save blog");
    }
  };

  const getAllBlogs = async () => {
    try {
      const data = await getAllBlogsFromDB();
      setAllBlogs(data);
    } catch (err) {
      console.error(err);
      toast.error("😥 Failed to fetch blogs");
    }
  };

  const getUserBlogs = async () => {
    try {
      const data = await getUserBlogsFromDB();
      setBlogs(data);
    } catch (err) {
      console.error(err);
      toast.error("😥 Failed to fetch blogs");
    }
  };

  const getBlog = async (_id) => {
    try {
      const data = await getBlogFromDB(_id);
      setBlog(data);
    } catch (err) {
      console.error(err);
      toast.error("😥 Failed to fetch blogs");
    }
  };

  const updateBlog = async () => {
    try {
      const data = await updateBlogToDB(blog);
      setBlog(data);
      toast.success("🎉 Blog Updated. Keep building");
    } catch (err) {
      console.error(err);
      toast.error("😥 Failed to update blog");
    }
  };

  const deleteBlog = async (_id) => {
    try {
      await deleteBlogFromDB(_id);
      const updatedBlogs: any = blogs.filter(
        (blog) => blog._id !== _id
      );
      setBlog(updatedBlogs);
      toast.success("🎉 Blog Deleted");
    } catch (err) {
      toast.error("😥 Failed to update blog");
      throw new Error(err);
    }
  };

  return (
    <BlogContext.Provider
      value={{
        step,
        setStep,
        blog,
        setBlog,
        blogs,
        allBlogs,
        getUserBlogs,
        saveBlog,
        updateBlog,
        articleLoading,
        deleteBlog,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export const useBlog: any = () => React.useContext(BlogContext);
