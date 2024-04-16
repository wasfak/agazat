"use server";

import { revalidatePath } from "next/cache";

import prisma from "../db/prisma";

type CreateUserInput = {
  clerkId: string;
  email: string;
  username: string;
  photo: string;
  firstName?: string;
  lastName?: string;
  isVac: boolean;
};

// CREATE
export async function createUser(user: CreateUserInput) {
  try {
    // Check if a user already exists with the given email
    const existingUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (existingUser) {
      // User already exists, handle accordingly
      // For example, you can return a message or throw an error
      throw new Error("A user with this email already exists.");
    }

    const userData = { ...user };
    // If no user exists, create a new user
    const newUser = await prisma.user.create({ data: userData });

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        clerkId: userId,
      },
    });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        clerkId: clerkId,
      },
      data: user,
    });
    if (!updatedUser) throw new Error("User update failed");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.log();
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    // Find user to delete
    const userToDelete = await prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      },
    });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await prisma.user.delete({
      where: {
        clerkId: clerkId,
      },
    });
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    console.log();
  }
}

export async function userVacation(clerkId: string) {
  try {
    const currentUser = await prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      },
      select: {
        isVac: true, // Only fetch the 'isVac' field
      },
    });

    if (!currentUser) throw new Error("User not found");
    if (typeof currentUser.isVac !== "boolean")
      throw new Error("Invalid isVac status");

    const updatedUser = await prisma.user.update({
      where: {
        clerkId: clerkId,
      },
      data: {
        isVac: !currentUser.isVac,
      },
    });
    revalidatePath("/");
    if (!updatedUser) throw new Error("User update failed");

    return {
      success: true,
      user: JSON.parse(JSON.stringify(updatedUser)),
    };
  } catch (error) {
    console.log();
  }
}
