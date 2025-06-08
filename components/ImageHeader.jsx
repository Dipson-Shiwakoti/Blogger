import React from "react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/public/assets";

const ImageHeader = () => {
  return (
    <div className="bg-gray-100 py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-center items-center">
        <Link href="/">
          <Image
            src={assets.logo}
            width={180}
            alt=""
            className="w-[130px] sm:w-auto"
          />
        </Link>
      </div>
    </div>
  );
};

export default ImageHeader;
