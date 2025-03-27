import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Sidebar } from "@/components/admin/sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/login?callbackUrl=/admin/dashboard`);
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-background">{children}</main>
    </div>
  );
}
