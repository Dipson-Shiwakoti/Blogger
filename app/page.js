"use client";
import Header from "@/components/Header";
import BlogList from "@/components/BlogList";
import Footer from "@/components/Footer";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { token } = useAuth();
  const [imgUrl, setImgUrl] = useState("");
  const [userName, setUserName] = useState("UserName");

  const fetchImgUrl = async () => {
    try {
      const response = await axios.get("/api/signup", {
        params: { id: token },
      });
      setImgUrl(response.data.image);
      setUserName(response.data.name);
      console.log(response.data.name);
    } catch (error) {
      console.error("Failed to fetch image URL", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchImgUrl();
  }, [token]);
  return (
    <>
      <Header imgUrl={imgUrl} userName={userName} />
      <BlogList />
      <Footer />
    </>
  );
}
