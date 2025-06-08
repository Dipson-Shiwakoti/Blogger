import { assets } from "@/public/assets";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

const Header = ({ imgUrl, userName }) => {
  const [open, setOpen] = useState(false);
  const [email, setemail] = useState("");
  const { token, logout } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please Enter an email");
      return;
    }
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post("/api/email", formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setemail("");
    } else {
      toast.error("Error");
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center px-4 sm:px-8 py-3">
        <Image
          src={assets.logo}
          width={180}
          alt=""
          className="w-[130px] sm:w-auto"
        />
        <div className="relative flex items-center gap-6 sm:gap-8">
          {!token ? (
            <Link href="/signup">
              <button className="flex items-center gap-2 font-semibold py-2 px-5 border border-black shadow-[ -7px_7px_0_#000 ] transition-transform hover:translate-y-[-2px] active:translate-y-0">
                Get started
                <Image src={assets.arrow} alt="arrow" />
              </button>
            </Link>
          ) : (
            <>
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full overflow-hidden">
                <Image
                  src={imgUrl ? imgUrl : assets.profile_icon}
                  alt=""
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="hidden sm:block text-base font-medium">
                {userName}
              </p>
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 font-semibold py-2 px-5 border border-black shadow-[ -7px_7px_0_#000 ] transition-transform hover:translate-y-[-2px] active:translate-y-0"
                  aria-expanded={open}
                >
                  Menu
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ease-in-out ${
                      open ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-md z-50">
                    <Link
                      href="/addProduct"
                      className="block px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
                    >
                      Add Blogs
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-[740px] mx-auto text-xs sm:text-base">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit,
          minus. Porro, incidunt dolorum quos est consectetur corporis sapiente
          ipsa optio saepe quas, ut voluptatem cumque aspernatur aperiam, dolor
          unde velit?
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col sm:flex-row justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]"
        >
          <input
            type="email"
            value={email}
            className="pl-4 outline-none"
            placeholder="Enter your email"
            onChange={(e) => setemail(e.target.value)}
          />
          <button
            type="submit"
            className="border-l px-4 py-4 active:bg-gray-600 active:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
