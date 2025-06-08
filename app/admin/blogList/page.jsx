"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BlockTableItem from "@/components/AdminComponents/BlockTableItem";
import { toast } from "react-toastify";

const page = () => {
  const [blogs, setblogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get("/api/blog");
    setblogs(response.data.blogs);
  };

  const deleteBlog = async (id) => {
    try {
      const response = await axios.delete("/api/blog", {
        params: { id },
      });
      setblogs((prevBlogs) => prevBlogs.filter((item) => item._id !== id));
      toast.success(response.data.msg);
    } catch (error) {
      if (error.response?.data?.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("Unknown error while deleting the blog");
      }
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1 className="text-3xl font-bold uppercase">All blogs</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
            <tr>
              <th scope="col" className="hidden sm:block px-5 py-3">
                Author name
              </th>
              <th scope="col" className="px-5 py-3">
                Blog Title
              </th>
              <th scope="col" className="px-5 py-3 hidden sm:block">
                Date
              </th>
              <th scope="col" className="px-5 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, index) => {
              return (
                <BlockTableItem
                  key={index}
                  id={item._id}
                  author={item.author}
                  authorImg={item.authorImg}
                  title={item.title}
                  date={item.date}
                  deleteBlog={deleteBlog}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
