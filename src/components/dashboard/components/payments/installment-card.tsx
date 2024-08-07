import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { monthNames } from "@/data/monthNames";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
type Props = {
  installment: string;
  firstInsPaid: boolean;
  month: string;
  year: string;
  rent: string;
  amount: number;
  date: string;
};
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export const InstallmentCard = ({
  installment,
  firstInsPaid,
  month,
  year,
  rent,
  amount,
  date,
}: Props) => {
  var InstallemtDate = new Date(date);

  var InstallemtDateString =
    monthNames[InstallemtDate.getMonth()] +
    " " +
    InstallemtDate.getDate() +
    " " +
    InstallemtDate.getFullYear();
  const handleStripeInitiation = async (
    month: any,
    year: any,
    rentAmt: any,
    paymentAmt: any
  ) => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/checkout-session-payments", {
      month: month,
      year: year,
      quantity: 1,
      rentAmt: rentAmt,
      paymentAmt: paymentAmt,
    });

    const result = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };
  return (
    <>
      {" "}
      <li className="mb-10 ms-4">
        <div className="absolute w-3 h-3 bg-gray-500 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time className="mb-1 text-sm font-normal leading-none text-gray-700 dark:text-gray-500">
          {InstallemtDateString}
        </time>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {installment} Installment
        </h3>
        <p className="text-base font-normal text-gray-700 dark:text-gray-400">
          This payment will be deducted from your account on automatically.
          <br />
          You can make a payment before the due date.
        </p>
        <br />
        {(installment == "First" || firstInsPaid) && (
          <Button
            variant="default"
            onClick={() => handleStripeInitiation(month, year, rent, amount)}
            //className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            Pay ${amount.toString()}
            <svg
              className="w-3 h-3 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Button>
        )}
      </li>{" "}
    </>
  );
};
