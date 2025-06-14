"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
}

interface AppbarProps {
  onSignin: (provider?: string, options?: object) => Promise<void>;
  onSignout: () => void;
  user?: User; // make user optional
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