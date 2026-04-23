import React from "react";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-[72px] md:ml-[103px] p-4 md:p-8 lg:p-12">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
