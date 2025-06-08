"use client";
import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/public/assets";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import ImageHeader from "@/components/ImageHeader";
import { supabase } from "@/lib/superbaseClient";

const page = () => {
  const [loading, setloading] = useState(false);
  const [image, setimage] = useState(false);
  const { token } = useAuth();

  const [data, setdata] = useState({
    title: "",
    description: "",
    category: "Startup",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdata((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!data.title || !data.description || !data.category) {
      toast.error("All fields are required");
      return;
    }

    if (!image) {
      toast.error("Please upload a picture");
      return;
    }

    try {
      setloading(true);
      const fileName = `${Date.now()}_${image.name}`;
      const filePath = `blogs/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, image);

      if (uploadError) {
        throw uploadError;
      }
      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath);

      const formData = new FormData();
      formData.append("id", token);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("image", publicUrl);

      const response = await axios.post("/api/blog", formData);
      if ((response.data.success = true)) {
        toast.success(response.data.msg);
        setdata({
          title: "",
          description: "",
          category: "Startup",
        });
        setimage(false);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      if (error.response?.data?.msg) {
        toast.error(error.response.data.msg);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <ImageHeader />
      <form
        onSubmit={onSubmitHandler}
        className="pt-5 px-5 sm:pt-12 sm:pl-16 bg-gray-100 h-fit"
      >
        <p className="text-xl">Upload thumbnail</p>
        <label htmlFor="image">
          <Image
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            width={140}
            height={70}
            alt=""
            className="mt-4"
          />
        </label>
        <input
          onChange={(e) => setimage(e.target.files[0])}
          type="file"
          id="image"
          hidden
          disabled={image}
        />
        <p className="text-xl mt-4">Blog title</p>
        <input
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border "
          type="text"
          placeholder="Type here"
        />

        <p className="text-xl mt-4">Blog description</p>
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border "
          type="text"
          placeholder="Write content here"
          rows={6}
        />

        <p className="text-xl mt-4">Blog Category</p>
        <select
          name="category"
          onChange={onChangeHandler}
          value={data.category}
          className="w-40 mt-4 px-4 py-3 border text-gray-500"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button
          type="submit"
          className={`mt-8 w-40 h-12 transition duration-200 
    ${
      !loading
        ? "bg-black text-white"
        : "bg-gray-400 text-gray-200 cursor-not-allowed"
    }`}
          disabled={loading}
        >
          ADD
        </button>
      </form>
    </>
  );
};

export default page;
