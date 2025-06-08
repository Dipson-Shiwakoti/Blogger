import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    if (
      username === process.env.ADMIN_USERNAME &&
      (await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH))
    ) {
      const response = NextResponse.json({ success: true }, { status: 200 });

      response.cookies.set("admin-auth", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 2,
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
