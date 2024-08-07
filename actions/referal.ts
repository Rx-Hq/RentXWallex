"use server";
import { db } from "@/lib/db";
import { auth } from "../auth";

export const referal = async (referTo: string) => {
  const session = await auth();
  const referCode = "REFER100";
  const id = session?.user.email!;
  const referAmt = "10";
  const checkEmail = await db.user_Info.findUnique({
    where: {
      email: referTo,
    },
  });
  if (checkEmail == null) {
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
    return "Referral successfully.";
  } else {
    return "User Already Exists!";
  }
};

export const getTotalReferrals = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("User is not authenticated");
  }

  const result = await db.user_Info.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      Referals: true,
    },
  });

  let totalAmt = 0;
  result?.Referals.forEach((referral) => {
    totalAmt += Number(referral.referAmt);
  });

  return totalAmt;
};
