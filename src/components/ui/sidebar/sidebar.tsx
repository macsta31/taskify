import React, { ReactNode } from "react";
import SidebarButton from "./SidebarButton";

const Sidebar = (): ReactNode => {
  return (
    <div className="p-6 border-r-solid border-r-2 border-r-green-500/50 min-w-60 bg-gray-900 [&>*]:text-white backdrop-blur-sm relative overflow-hidden">
      {/* Decorative elements for tech feel */}
      <div className="absolute -left-10 top-1/4 w-40 h-40 bg-green-500/10 rounded-full blur-2xl z-0"></div>
      <div className="absolute -right-20 top-3/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl z-0"></div>
      
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#0f0_1px,transparent_1px)] bg-[size:20px_20px] opacity-[0.03] z-0"></div>
      
      <div className="relative z-10">
        <h1 className="mb-8 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400 tracking-wider">
          Taskify
        </h1>
        <div className="space-y-3">
          <SidebarButton title="Dashboard" link="/dashboard" />
          <SidebarButton title="Projects" link="/dashboard/projects" />
          <SidebarButton title="Tasks" link="/dashboard/tasks" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
