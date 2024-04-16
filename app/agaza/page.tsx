import CustmButton from "@/components/CustmButton";

import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AgazaPage() {
  const { userId } = auth();

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId!,
    },
  });

  if (!user) {
    redirect("/");
  }

  return (
    <main className="flex mt-10 justify-center min-h-screen gap-x-4">
      <CustmButton user={user} />
      <p>Current Status: {user.isVac ? "اجازة" : "موجود"}</p>
    </main>
  );
}
