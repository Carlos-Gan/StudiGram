import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Topbar from "@/components/shared/Topbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex h-screen">
      <header className="justify-between ">
        <Topbar />
      </header>

      <aside className="hidden md:block w-32">
        <LeftSidebar />
      </aside>
      

      <main className="flex-1 flex flex-col p-4">
        <Outlet /> 
      </main>
        
      <footer className="w-full md:hidden">
        <Bottombar />
      </footer>
      
    </div>
  );
};

export default RootLayout;
