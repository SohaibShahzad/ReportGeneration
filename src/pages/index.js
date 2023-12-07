// pages/index.js

import { useSession, signOut } from "next-auth/react";
import { HeroSection } from "@/components/hero/hero";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <main className="font-worksans">
      <HeroSection />
      {/* {session ? (
        <div>
          <div>Hello, {session.user.name || session.user.email}!</div>
          <Button
            onClick={handleLogout}
            className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </Button>
        </div>
      ) : (
        <div>
          Hello, World
          <Button>
            <a href="/login">Login</a>
          </Button>
        </div>
      )} */}

    </main>
  );
}
