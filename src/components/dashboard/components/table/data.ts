import { useEffect, useState } from "react";
import { PaymentInfo } from "../../../../../actions/payment";
import { PaymentInfoType } from "@/types";

export const columns = [
  { name: "No.", uid: "id" },
  { name: "Date", uid: "paymentDate" },
  { name: "Rent amount", uid: "rentAmt" },
  { name: "Payment amount", uid: "paymentAmt" },
  { name: "Remaining amount", uid: "remainingAmt" },
  { name: "Status", uid: "status" },
];

const user = async () => {
  const result = await PaymentInfo();
  console.log(result);
  return result;
};

export const users = user();
