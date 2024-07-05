/**
 * Retrieves a user from the database based on the Clerk ID.
 *
 * @param select - Optional object specifying the fields to select from the user.
 * @returns A Promise that resolves to the user object if found, or null if not found.
 */
import { auth } from "@clerk/nextjs/server";
import { prisma } from "../../prisma";

export const getUserFromClerkID = async (select = { id: true }) => {
  const { userId } = await auth();
  if (userId) {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId as string,
      },
      select,
    });
    return user;
  }
  return null;
};
