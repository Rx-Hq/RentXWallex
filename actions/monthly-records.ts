"use server";
import { db } from "@/lib/db";
import { auth } from "../auth";

export const insertMonthlyRecord = async (
  month: any,
  year: any,
  rentPaid: any,
  remainingRent: any,
  totalRent: any
) => {
  const session = await auth();
  const id = session?.user.email!;
  const result = await db.user_Info.update({
    where: {
      email: id,
    },
    data: {
      Monthly_Rent_Record: {
        create: {
          month: month,
          year: year.toString(),
          rentPaid: rentPaid.toString(),
          remainingRent: remainingRent,
          totalRent: totalRent,
        },
      },
    },
  });
  return "Monthly record inserted successfully.";
};

export const updateMonthlyRecord = async (
  month: any,
  year: any,
  rentPaid: any,
  totalRent: any
) => {
  console.log(month, year, rentPaid);
  const session = await auth();
  const id = session?.user.email!;
  const data = await getNextMonthlyRecord(month, year);
  const rentPaidAmt =
    Number(data?.Monthly_Rent_Record[0].rentPaid) + Number(rentPaid);
  const remainingRent =
    Number(data?.Monthly_Rent_Record[0].remainingRent) - Number(rentPaid);
  const result = await db.user_Info.update({
    where: {
      email: id,
    },
    data: {
      Monthly_Rent_Record: {
        update: {
          where: {
            monthIdentifier: {
              month: month,
              year: year,
            },
          },
          data: {
            rentPaid: rentPaidAmt.toString(),
            remainingRent: remainingRent.toString(),
          },
        },
      },
    },
  });
  return "Monthly record inserted successfully.";
};

export const getNextMonthlyRecord = async (month: any, year: any) => {
  const session = await auth();
  const id = session?.user.email!;
  const result = await db.user_Info.findUnique({
    where: {
      email: id,
    },
    include: {
      Monthly_Rent_Record: {
        where: {
          month: month,
          year: year.toString(),
        },
      },
    },
  });
  return result;
};
export const getTotalInvoices = async () => {
  const session = await auth();
  const id = session?.user.email!;
  const result = await db.user_Info.findUnique({
    where: {
      email: id,
    },
    include: {
      Monthly_Rent_Record: true,
    },
  });
  var totalRent = 0;
  result?.Monthly_Rent_Record.forEach((element) => {
    totalRent += Number(element.totalRent);
  });
  return totalRent;
};
export const getTotalPayments = async () => {
  const session = await auth();
  const id = session?.user.email!;
  const result = await db.user_Info.findUnique({
    where: {
      email: id,
    },
    include: {
      Monthly_Rent_Record: true,
    },
  });
  var rentRecieved = 0;
  result?.Monthly_Rent_Record.forEach((element) => {
    rentRecieved += Number(element.rentPaid);
  });
  return rentRecieved;
};
