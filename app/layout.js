import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Blogger",
  description: "created by dipson shiwakoti",
  icons: {
    icon: "/assets/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          {children}
          <ToastContainer theme="dark" />
        </AuthProvider>
      </body>
    </html>
  );
}
