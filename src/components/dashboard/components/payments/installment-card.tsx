import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { monthNames } from "@/data/monthNames";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
type Props = {
  month: string;
  year: string;
  rent: string;
  amount: number;
  date: string;
};
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export const InstallmentCard = ({ month, year, rent, amount, date }: Props) => {
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
    <Card className=" bg-green-100 rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <div className="flex flex-col mb-5">
            {/* <span className="text-white">Auto Insurance</span> */}

            <p className="text-center text-black text-lg">
              First Installment on{" "}
              <span className="font-bold">{InstallemtDateString}</span>
            </p>
          </div>
        </div>{" "}
        <Button
          onClick={() => handleStripeInitiation(month, year, rent, amount)}
          variant="default"
          size="lg"
        >
          Pay ${amount.toString()}
        </Button>
        {/* <div className="flex items-center gap-6"> */}
        {/* <div>
            <div>
              <span className="font-semibold text-success text-xs">{"↓"}</span>
              <span className="text-xs text-black">100,930</span>
            </div>
            <span className="text-black text-xs">USD</span>
          </div>

          <div>
            <div>
              <span className="font-semibold text-danger text-xs">{"↑"}</span>
              <span className="text-xs text-black">54,120</span>
            </div>
            <span className="text-black text-xs">USD</span>
          </div>

          <div>
            <div>
              <span className="font-semibold text-danger text-xs">{"⭐"}</span>
              <span className="text-xs text-black">125</span>
            </div>
            <span className="text-black text-xs">VIP</span>
          </div>
        </div> */}
      </CardBody>
    </Card>
  );
};
