"use server";

import { db } from "@/lib/db";
import { auth } from "../auth";

export const PaymentInfo = async () => {
  const session = await auth();

  const result = db.user_Info.findUnique({
    where: {
      email: session?.user.email!,
    },
    include: {
      Payment_Info: {
        orderBy: {
          payemntDate: "desc",
        },
      },
    },
  });
  return result;
};

export const SavePaymentInfo = async (
  id: string,
  type: string,
  rentAmt: number,
  paymentAmt: number,
  transactionType: string,
  status: string
) => {
  const session = await auth();

  const date = new Date().toISOString();
  console.log(rentAmt);
  const result = db.user_Info.update({
    where: {
      email: session?.user.email!,
    },
    data: {
      Payment_Info: {
        create: {
          paymentId: id,
          paymentType: type,
          rentAmt: rentAmt.toString(),
          paymentAmt: paymentAmt.toString(),
          payemntDate: date,
          transactionType: transactionType,
          status: status,
        },
      },
    },
  });
  console.log(result);
  return result;
};
