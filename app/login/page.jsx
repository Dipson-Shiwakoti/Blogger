"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ImageHeader from "@/components/ImageHeader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

const page = () => {
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const { login, token } = useAuth();
  const [data, setdata] = useState({
    email: "",
    password: "",
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
    setloading(true);
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const response = await axios.post("/api/login", formData);
      const { success, msg, authToken } = response.data || {};

      if (success) {
        login(authToken);
        toast.success(msg);
        router.push("/");
      } else {
        toast.error(msg || "Login failed");
      }
    } catch (error) {
      if (error.response?.data?.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("Unknown error while login");
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
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <p className="block text-gray-700">Email</p>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={data.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <p className="block text-gray-700">Password</p>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={data.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
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
              Log in
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don&apos;t have an account?
            <Link href="/signup" className="text-blue-600 hover:underline ml-1">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default page;
