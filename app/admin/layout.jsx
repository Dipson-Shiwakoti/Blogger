
import Sidebar from "@/components/AdminComponents/Sidebar";


export default function Layout({ children }) {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          {children}
        </div>
      </div>
    </>
  );
}
