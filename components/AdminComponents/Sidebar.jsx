import React from "react";
import Image from "next/image";
import { assets } from "@/public/assets";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="flex flex-col  bg-slate-100">
      <div className="px-2 sm:pl-14 py-3 border border-black">
        <Link href="/">
          <Image src={assets.logo} width={120} alt="" />
        </Link>
      </div>
      <div className="w-45 sm:w-80 h-[100vh] relative py-12 border border-black">
        <div className="w-[86%] sm:w-[80%] absolute left-5">
          <Link
            href="/admin/blogList"
            className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]"
          >
            <Image src={assets.blog_icon} alt="" width={28} />
            <p>Blog List</p>
          </Link>
          <Link
            href="/admin/subscriptions"
            className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]"
          >
            <Image src={assets.email_icon} alt="" width={28} />
            <p>Subscriptions</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
