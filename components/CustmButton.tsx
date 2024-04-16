"use client";
import { User } from "@prisma/client";
import { Button } from "./ui/button";
import { userVacation } from "@/lib/actions/userActions";

type ButtonProps = {
  user: User;
};

export default function CustmButton({ user }: ButtonProps) {
  const handelVac = async (id: string) => {
    const res = await userVacation(id);
    if (res?.success) {
      alert("Vacation status updated successfully!");
    }
  };

  return (
    <Button onClick={() => handelVac(user.clerkId)}>{user.username}</Button>
  );
}
