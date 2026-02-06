import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.discordId) {
    redirect("/unauthorized");
  }

  await connectToDatabase();

  const admin = await User.findOne({
    discordId: session.user.discordId,
  });

  if (!admin) {
    redirect("/admin-unauthorized");
  }

  return <>{children}</>;
}
