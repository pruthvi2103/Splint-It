import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const AuthGuard = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element | null => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push({
        pathname: "/demo/login",
        query: router.query,
      });
    },
  });
  if (session) {
    return <>{children}</>;
  }

  return null;
};

export default AuthGuard;
