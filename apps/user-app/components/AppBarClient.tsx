"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "./Appbar";
import { useRouter } from "next/navigation";

export function AppbarClient() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignin = () => {
    router.push("/signin");
  };

  const handleSignout = async () => {
    await signOut({ redirect: false });
    router.push("/signin");
  };

  return (
    <Appbar
      onSignin={handleSignin}
      onSignout={handleSignout}
      user={session?.user}
    />
  );
}
