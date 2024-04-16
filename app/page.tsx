import { Button } from "@/components/ui/button";
import prisma from "@/lib/db/prisma";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <main className="flex mt-10 justify-center min-h-screen gap-x-4">
      {users.map((user) => (
        <Button
          key={user.id}
          className={`${
            user.isVac ? "bg-[#FF0000]" : "bg-[#008000]"
          } text-white hover:bg-black`}
        >
          {user.username}
        </Button>
      ))}
    </main>
  );
}
