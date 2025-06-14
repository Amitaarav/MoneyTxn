"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { LandingPage } from "../app/(landing)/landingPage";
export default function Page(): JSX.Element {
  const session = useSession();
  return (
   <div>
      {/* <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} /> */}
      <LandingPage />
   </div>
  );
}
