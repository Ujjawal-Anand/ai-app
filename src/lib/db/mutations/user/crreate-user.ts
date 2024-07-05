/**
 * Saves a user to the database.
 *
 * @param user - The user object to be saved.
 */
import { User } from "@clerk/nextjs/server";
import { prisma } from "../../prisma";

export const saveUser = async (user: User | null) => {
  let match = false;
  if (user && user.id) {
    try {
      match = await prisma.user.findUnique({
        where: {
          clerkId: user.id,
        },
      });
    } catch (e) {
      console.log(e);
    }

    if (!match) {
      await prisma.user.create({
        data: {
          clerkId: user?.id,
          email: user?.emailAddresses[0].emailAddress,
        },
      });
    }
  }
};
