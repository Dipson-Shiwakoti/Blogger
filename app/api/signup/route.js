import { ConnectDB } from "@/lib/config/db";
import SignUpModel from "@/lib/models/SignUpModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const LoadDb = async () => {
  await ConnectDB();
};

LoadDb();

export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");
  const info = await SignUpModel.findById(id);

  return NextResponse.json({ name: info.name, image: info.image });
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const imageUrl = formData.get("image");

    const existingUser = await SignUpModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, msg: "Email already in use" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new SignUpModel({
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
    });

    await SignUpModel.create(newUser);

    return NextResponse.json({
      success: true,
      msg: "User registered successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}
