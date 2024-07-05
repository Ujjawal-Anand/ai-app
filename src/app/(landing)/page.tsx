import { Button } from "@/components/ui/button";
import { getUserFromClerkID } from "@/lib/db/query/user/getUser";
import Link from "next/link";
import GenerateAssessment from "./generate-assessment";

export default async function Home() {
  const user = await getUserFromClerkID();
  const userId = user?.id;
  return (
    <main className="flex h-full w-full">
      <div className="mx-5 md:p-24 mt-[80px] flex flex-col items-center w-full">
        <div className="flex flex-col items-start">
          <h3 className="md:text-3xl text-2xl">
            Validate programming skills, take a test
          </h3>
          {!userId ? (
            <Button className="mt-4" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          ) : (
            <GenerateAssessment />
          )}
        </div>
      </div>
    </main>
  );
}
