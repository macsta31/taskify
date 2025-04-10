import Sidebar from "@/components/ui/sidebar/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className="pl-[15rem] bg-gray-900 min-h-screen relative overflow-x-hidden">
        {/* Decorative gradients */}
        <div className="absolute top-0 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-green-500/5 rounded-full blur-3xl"></div>
        
        {/* Grid overlay for techy feel */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:40px_40px] z-0"></div>
        
        {/* Content with z-index to appear above decorative elements */}
        <div className="relative z-10 px-12 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
