"use client";
import { assets } from "@/public/assets";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const page = () => {
  const [data, setdata] = useState(null);
  const params = useParams();
  const { token } = useAuth();

  const fetchBlogData = async () => {
    const response = await axios.get("/api/blog", {
      params: { id: params.id },
    });
    setdata(response.data);
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={assets.logo}
              width={180}
              alt=""
              className="w-[130px] sm:w-auto"
            />
          </Link>
          {!token && (
            <Link href="/signup">
              <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
                Get Started <Image src={assets.arrow} alt=""></Image>
              </button>
            </Link>
          )}
        </div>
        <div className="flex flex-col items-center justify-center my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={data.authorImg ? data.authorImg : assets.profile_icon}
              alt=""
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          </div>

          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {data.author}
          </p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          src={data.image}
          width={1280}
          height={720}
          alt=""
          className="border-4 border-white"
        />
        <div className="mt-10 text-lg leading-8 text-gray-800 whitespace-pre-line">
          {data.description}
        </div>
        <div className="my-24">
          <p className="text-black font-semibold my-4">
            Share this article on Social Media
          </p>
          <div className="flex">
            <Image src={assets.facebook_icon} width={50} alt="" />
            <Image src={assets.twitter_icon} width={50} alt="" />
            <Image src={assets.googleplus_icon} width={50} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <>
      <h1>NO DATA FOUND</h1>
    </>
  );
};

export default page;
