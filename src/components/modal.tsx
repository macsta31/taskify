"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
};

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
}: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  // Size classes based on size prop
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      // Restore body scrolling when modal is closed
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Client-side only
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop - blurred with techno grid pattern */}
      <div 
        className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-40"
        onClick={onClose}
      >
        {/* Tech grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* Circuit pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#0f0_1px,transparent_1px)] bg-[size:20px_20px] opacity-[0.02]"></div>
      </div>

      {/* Modal Content */}
      <div 
        className={`relative z-50 ${sizeClasses[size]} w-full bg-gray-800/90 border border-gray-700 rounded-lg shadow-xl animate-scaleUp`}
      >
        {/* Decorative elements for tech feel */}
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-green-500/10 rounded-full blur-2xl -z-10"></div>
        <div className="absolute -left-8 -bottom-8 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl -z-10"></div>
        
        <div className="relative overflow-hidden rounded-lg">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-700 bg-gray-800/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400">
                {title}
              </h3>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="ml-auto text-gray-400 hover:text-white focus:outline-none transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            {children}
          </div>

          {/* Footer with subtle tech line */}
          <div className="px-6 py-4 border-t border-gray-700 bg-gray-800/50">
            <div className="h-1 w-full relative overflow-hidden rounded-full bg-gray-700">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-cyan-500 w-1/3 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
