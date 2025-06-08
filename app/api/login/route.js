import { ConnectDB } from "@/lib/config/db";
import SignUpModel from "@/lib/models/SignUpModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

await ConnectDB();

export async function POST(request) {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const user = await SignUpModel.findOne({ email });

    const isValid = user && (await bcrypt.compare(password, user.password));

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          msg: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      msg: "Logged in successfully",
      authToken: user._id,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        msg: "Server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
