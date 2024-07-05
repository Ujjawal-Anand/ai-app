"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
const siteRoutes = [
  {
    href: "/",
    label: "Home",
  },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex gap-x-5 text-[14px]">
        {siteRoutes.map((siteRoute) => (
          <li key={siteRoute.href}>
            <Link
              href={siteRoute.href}
              className={`text-zinc-400 transition ${
                pathname === siteRoute.href ? "text-zinc-900" : ""
              }`}
            >
              {siteRoute.label}
            </Link>
          </li>
        ))}
        <div className="space-y-4">
          <SignedIn>
            {/* Mount the UserButton component */}
            <UserButton />
          </SignedIn>
          <SignedOut>
            {/* Signed out users get sign in button */}
            <SignUpButton />
          </SignedOut>
        </div>
      </ul>
    </nav>
  );
}
