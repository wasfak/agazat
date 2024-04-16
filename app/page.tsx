import { Button } from "@/components/ui/button";
import prisma from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <main className="flex flex-wrap mt-3 justify-center min-h-screen min-w-screen gap-4 ">
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl max-h-[200px] p-4 border shadow-2xl rounded-lg bg-white">
        {users.map((user) => (
          <div className={`p-1`} key={user.id}>
            <Button
              className={`${user.isVac ? "bg-[#FF0000]" : "bg-[#008000]"}
            text-white`}
            >
              {user.username}
            </Button>
          </div>
        ))}
      </div>
    </main>
  );
}
