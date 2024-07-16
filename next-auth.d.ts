import { Userrole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id:string;
  role: Userrole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
