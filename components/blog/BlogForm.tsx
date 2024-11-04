import React from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

import { useBlog } from "@/context/blog";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { SignInButton, useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
];

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
export default function BlogForm() {
  const pathname = usePathname();
  const router = useRouter();

  const isEdit = pathname.includes("/edit/");
  const { blog, setBlog, saveBlog, updateBlog } = useBlog();
  const { isSignedIn } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) updateBlog();
    else saveBlog(blog);
    router.push(`/article/${blog._id}`);
    // save blog and go to next step
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevState) => ({ ...prevState, [name]: value }));
    localStorage.setItem("blog", JSON.stringify(blog));
  };

  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg overflow-y-auto">
      <div className="mb-10">
        <Input
          className="mb-3"
          onChange={handleChange}
          name="title"
          value={blog.title}
          placeholder="Your Title"
          type="text"
          autoFocus
        />
        <Input
          className="mb-3"
          onChange={handleChange}
          name="subtitle"
          value={blog.subtitle}
          placeholder="Enter subtitle title"
          type="text"
          autoFocus
        />
        <ReactQuill
          theme="snow"
          placeholder="Article"
          modules={modules}
          formats={formats}
          onChange={(e) => setBlog({ ...blog, summary: e })}
          value={blog.summary}
        />
      </div>
      <div className="flex justify-end mt-5">
        {isSignedIn ? (
          <Button onClick={handleSubmit}>Save</Button>
        ) : (
          <SignInButton>
            <Button>Sign in to save</Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}
