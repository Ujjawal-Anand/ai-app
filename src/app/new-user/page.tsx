import { saveUser } from "@/lib/db/mutations/user/crreate-user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const createNewUser = async () => {
  const user = await currentUser();
  await saveUser(user);
  redirect("/");
};

const NewUserPage = async () => {
  await createNewUser();

  return <></>;
};

export default NewUserPage;
