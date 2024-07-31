"use server";
import { db } from "@/lib/db";
import { auth } from "../auth";
export const getMembershipTypes = async () => {
  const result = await db.membership_Plans.findMany();
  return result;
};

export const getMembership = async () => {
  const session = await auth();
  const result = await db.user_Info.findUnique({
    where: {
      email: session?.user.email!,
    },
    include: {
      Membership_Info: {
        orderBy: {
          membershipStartDate: "desc",
        },
        take: 1,
      },
    },
  });
  console.log(result);
  if (result) {
    return result;
  } else {
    return undefined;
  }
};

export const insertMembershipdetails = async (
  membershiptype: any,
  membershipAmt: any,
  membershipDuration: any
) => {
  const start = new Date().toISOString();
  const session = await auth();
  const id = session?.user.email!;
  const ends = new Date();
  console.log(membershipDuration);
  if (Number(membershipDuration) == 1) {
    console.log("one");
    ends.setMonth(ends.getMonth() + Number(membershipDuration));
  } else if (Number(membershipDuration) == 12) {
    console.log("year");
    ends.setFullYear(ends.getFullYear() + 1);
  }

  const finalEnds = ends.toISOString();
  console.log(id);
  console.log(start);
  console.log(finalEnds);
  const result = await db.user_Info.update({
    where: {
      email: id,
    },
    data: {
      Membership_Info: {
        create: {
          membershipType: membershiptype,
          membershipAmt: membershipAmt,
          membershipDuration: membershipDuration,
          membershipStatus: "Active",
          membershipExpireDate: finalEnds,
          membershipStartDate: start,
        },
      },
    },
  });
  return "Membership purchased successfully.";
};
