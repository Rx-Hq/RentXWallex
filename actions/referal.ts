"use server";
import { db } from "@/lib/db";
import { auth } from "../auth";

export const referal = async (referTo: string) => {
  const session = await auth();
  const referCode = "REFER100";
  const id = session?.user.email!;
  const referAmt = "10";
  const result = await db.user_Info.update({
    where: {
      email: id,
    },
    data: {
      Referals: {
        create: {
          referToEmail: referTo,
          referAmt: referAmt,
          referCode: referCode,
        },
      },
    },
  });
  return "Referal successfully.";
};

export const getTotalReferrals = async () => {
  const session = await auth();
  const result = db.user_Info.findUnique({
    where: {
      email: session?.user.email!,
    },
    include: {
      Referals: true,
    },
  });

  return result;
};
