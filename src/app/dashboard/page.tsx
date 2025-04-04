import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard/overview");

  // This won't be rendered, but kept for fallback
  return (
    <>
      <h1 className="text-2xl">Dashboard</h1>
    </>
  );
}
