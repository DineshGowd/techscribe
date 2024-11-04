import mongoose, { Schema, model } from "mongoose";

const BlogScheme = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    title: String,
    subtitle: String,
    address: String,
    startDate: String,
    endDate: String,
    summary: String,
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || model("Blog", BlogScheme);
export default Blog;
