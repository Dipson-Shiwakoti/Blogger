import React from "react";
import Image from "next/image";
import { assets } from "@/public/assets";

const BlockTableItem = ({ authorImg, title, author, id, date, deleteBlog }) => {
  const BlogDate = new Date(date);

  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Image
            src={authorImg ? authorImg : assets.profile_icon}
            alt=""
            width={48}
            height={48}
            className="object-cover w-full h-full"
          />
        </div>
        <p>{author ? author : "No author"}</p>
      </th>
      <td className="px-6 py-4">{title ? title : "no title"}</td>
      <td className="px-6 py-4 hidden sm:block">
        {BlogDate ? BlogDate.toDateString() : "no date"}
      </td>
      <td className="px-6 py-4 cursor-pointer" onClick={() => deleteBlog(id)}>
        X
      </td>
    </tr>
  );
};

export default BlockTableItem;
