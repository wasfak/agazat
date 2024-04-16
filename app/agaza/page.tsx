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
    <main className="flex justify-center mt-10 h-[100px] bg-gray-100">
      <div className="p-6 max-w-sm bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <CustmButton user={user} />
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            Current Status: {user.isVac ? "On Leave" : "Available"}
          </p>
        </div>
      </div>
    </main>
  );
}
