import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../services/server/db/mongoDb";
import { MongoClient } from "mongodb";
import { getUserAccountType } from "../../../services/server/account";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  adapter: MongoDBAdapter(clientPromise as unknown as Promise<MongoClient>),
  callbacks: {
    async session({ session, user, token }) {
      if (session.user?.email) {
        //@ts-ignore
        session.user.type = await getUserAccountType(session.user?.email);
      }

      return session;
    },
  },
});
