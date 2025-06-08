import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import SignUpModel from "@/lib/models/SignUpModel";
const { NextResponse } = require("next/server");
import { supabase } from "@/lib/superbaseClient";

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export async function GET(request) {
  try {
    const blogId = request.nextUrl.searchParams.get("id");
    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      return NextResponse.json(blog);
    } else {
      const blogs = await BlogModel.find({});
      return NextResponse.json({ blogs });
    }
  } catch (erorr) {
    NextResponse.json(
      {
        success: false,
        msg: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    const image = formData.get("image");
    const id = formData.get("id");

    const info = await SignUpModel.findById(id);

    const newBlog = {
      title,
      description,
      category,
      image,
      author: info.name,
      authorImg: info.image,
    };

    await BlogModel.create(newBlog);

    return NextResponse.json({ success: true, msg: "Blog Added Successfully" });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        msg: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    console.log("Deleting blog with ID:", id);

    const blog = await BlogModel.findById(id);
    const publicUrl = blog.image;
    console.log("Public URL:", publicUrl);

    // Extract the path after '/object/public/images/'
    const storagePath = publicUrl.split("/object/public/images/")[1]; // gives: blogs/1749375172098_DSC_3090.JPG
    console.log("Storage path to delete:", storagePath);

    const { error: deleteError } = await supabase.storage
      .from("images")
      .remove([storagePath]); // ✅ this is correct now

    if (deleteError) {
      console.error("Error deleting from Supabase:", deleteError.message);
      return NextResponse.json(
        { success: false, msg: "Failed to delete image from storage" },
        { status: 500 }
      );
    }

    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({ msg: "Blog deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json(
      { success: false, msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}
