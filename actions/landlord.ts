"use server";

import { db } from "@/lib/db";
import { auth } from "../auth";

export const landlordInfo = async () => {
  const session = await auth();

  const result = db.user_Info.findUnique({
    where: {
      email: session?.user.email!,
    },
    include: {
      Property_Info: true,
    },
  });
  return result;
};
