import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const AuthButtons = () => {
  const { status } = useSession();
  const router = useRouter();
  type loginTypes = "google" | "github";
  const handleBtnCLick = (loginType: loginTypes) => {
    signIn(loginType);
  };
  if (status === "authenticated") {
    return router.push({
      pathname: "/demo",
      query: router.query,
    });
  }
  return (
    <div className="flex flex-col p-6 w-80 box-shadow-02 rounded-md self-center">
      <button
        onClick={() => {
          handleBtnCLick("google");
        }}
        className="flex items-center  hover:border-gray-500 transition-all duration-300 justify-center text-base rounded-lg py-2 text-gray-700 font-semibold border border-gray-300"
      >
        <FcGoogle className="mr-2" /> Continue with Google
      </button>
      <button
        onClick={() => {
          handleBtnCLick("github");
        }}
        className="flex items-center hover:border-gray-500 transition-all duration-300  justify-center text-base rounded-lg mt-3 py-2 text-gray-700 font-semibold border border-gray-300"
      >
        <FaGithub className="mr-2" />
        Continue with GitHub
      </button>
    </div>
  );
};

export { AuthButtons };
