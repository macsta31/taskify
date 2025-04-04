import Link from "next/link";
import React, { ReactNode } from "react";

type SidebarButtonProps = {
  link: string;
  title: string;
  icon?: ReactNode;
};

const SidebarButton = ({
  link,
  title,
  icon
}: SidebarButtonProps): ReactNode => {
  return (
    <Link href={link}>
      <div className="px-4 py-3 rounded-md hover:bg-gray-800 transition-all duration-300 flex items-center justify-between group border border-transparent hover:border-green-500/20 hover:shadow-[0_0_10px_rgba(16,185,129,0.1)]">
        <div className="font-medium text-gray-300 group-hover:text-green-400 transition-colors">{title}</div>
        <div className="text-gray-500 group-hover:text-green-400 transition-colors">
          {icon || (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SidebarButton;
