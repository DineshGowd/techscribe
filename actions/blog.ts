"use server";
/* eslint-disable  @typescript-eslint/no-explicit-unknown */

import Blog from "@/models/blog";
import db from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";

export const checkOwnerShip = async (_id: any) => {
  try {
    db();
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;
    if (!userEmail) {
      throw new Error("User not found");
    }
    const blog = await Blog.findById({ _id });
    if (!blog) {
      throw new Error("Blog not found");
    }
    if (blog.userEmail !== userEmail) {
      throw new Error("Unauthorized");
    }
    return true;
  } catch (err) {
    throw new Error(err);
  }
};

export const saveBlogToDB = async (data) => {
  try {
    db();
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    const { _id, ...rest } = data;
    const blog = await Blog.create({ ...rest, userEmail });
    return JSON.parse(JSON.stringify(blog));
  } catch (err) {
    throw new Error(err);
  }
};

export const getUserBlogsFromDB = async () => {
  try {
    db();
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;
    const blog = await Blog.find({ userEmail });
    return JSON.parse(JSON.stringify(blog));
  } catch (err) {
    throw new Error(err);
  }
};

export const getAllBlogsFromDB = async () => {
  try {
    db();
    const blog = await Blog.find();
    return JSON.parse(JSON.stringify(blog));
  } catch (err) {
    throw new Error(err);
  }
};

export const getBlogFromDB = async (id: any) => {
  try {
    db();
    const blog = await Blog.findById(id);
    return JSON.parse(JSON.stringify(blog));
  } catch (err) {
    throw new Error(err);
  }
};

export const updateBlogToDB = async (data) => {
  try {
    db();
    const { _id, ...rest } = data;
    await checkOwnerShip(_id);
    const blog = await Blog.findByIdAndUpdate(_id, { ...rest }, { new: true });
    return JSON.parse(JSON.stringify(blog));
  } catch (err) {
    throw new Error(err);
  }
};

export const updateSkillsToDB = async (data) => {
  try {
    db();
    const { _id, skills } = data;
    await checkOwnerShip(_id);
    const blog = await Blog.findByIdAndUpdate(_id, { skills }, { new: true });
    return JSON.parse(JSON.stringify(blog));
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteBlogFromDB = async (_id: any) => {
  try {
    db();
    await checkOwnerShip(_id);
    const blog = await Blog.findByIdAndDelete(_id);
    return JSON.parse(JSON.stringify(blog));
  } catch (err) {
    throw new Error(err);
  }
};
