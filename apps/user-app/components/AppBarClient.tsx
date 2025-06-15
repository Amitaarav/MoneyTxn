"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "./Appbar";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
}

interface AppbarProps {
  onSignin: () => void;
  onSignout: () => void;
  user?: User;
}

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();

  return (
    <div>
        <Appbar onSignin = {signIn} onSignout={async () => {
          await signOut()
          router.push("/api/auth/signin")
        }} user = {session.data?.user} />
    </div>
  );
}