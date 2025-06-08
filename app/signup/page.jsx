"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { assets } from "@/public/assets";
import { toast } from "react-toastify";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ImageHeader from "@/components/ImageHeader";
import { supabase } from "@/lib/superbaseClient";

const page = () => {
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const { token } = useAuth();
  const [image, setimage] = useState(false);
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.password || !data.confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!image) {
      toast.error("Please upload a profile picture");
      return;
    }

    try {
      setloading(true);
      const fileName = `${Date.now()}_${image.name}`;
      const filePath = `profile/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, image);

      if (uploadError) {
        throw uploadError;
      }

      // 2. Get the public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath);

      // 3. Prepare form data
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("image", publicUrl);

      const response = await axios.post("/api/signup", formData);

      if (response.data.success) {
        toast.success("Registration successful! Please login.");
        router.push("/login");
      } else {
        throw new Error(response.data.msg || "Registration failed");
      }
    } catch (error) {
      if (error.response?.data?.msg) {
        toast.error(error.response.data.msg);
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="flex flex-col gap-3 justify-center w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <p className="block text-gray-700">Full Name</p>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={data.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="block text-gray-700">Email</p>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={data.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="block text-gray-700">Password</p>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={data.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="block text-gray-700">Confirm Password</p>
            <input
              type="password"
              name="confirmPassword"
              placeholder="********"
              value={data.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-gray-700 text-lg font-medium">
              Upload Profile Picture
            </p>
            <label htmlFor="image" className="cursor-pointer">
              <Image
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                width={140}
                height={70}
                alt="Upload Profile"
              />
            </label>

            <input
              onChange={(e) => setimage(e.target.files[0])}
              type="file"
              id="image"
              hidden
              disabled={image}
            />

            <button
              type="submit"
              className={`w-full py-2 rounded-lg transition duration-200 
    ${
      !loading
        ? "bg-blue-600 hover:bg-blue-700 text-white"
        : "bg-gray-400 text-gray-200 cursor-not-allowed"
    }`}
              disabled={loading}
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?
            <Link href="/login" className="text-blue-600 hover:underline ml-1">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default page;
