
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto py-8 px-4 animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
