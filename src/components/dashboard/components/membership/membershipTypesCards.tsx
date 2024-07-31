import { MembershipsType } from "@/types";
import { Avatar, AvatarGroup, Card, CardBody } from "@nextui-org/react";
import React from "react";
import { insertMembershipdetails } from "../../../../../actions/membership";
import { auth } from "../../../../../auth";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const pictureUsers = [
  "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  "https://i.pravatar.cc/150?u=a04258114e29026702d",
  "https://i.pravatar.cc/150?u=a048581f4e29026701d",
  "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
];
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const handleStripeInitiation = async (
  membershipType: any,
  membershipAmt: any,
  membershipDuration: any
) => {
  const stripe = await stripePromise;
  if (
    membershipType == "Gold Membership (Yearly)" ||
    membershipType == "Platinum Membership (Yearly)"
  ) {
    membershipAmt = (membershipAmt * 90) / 100;
  }
  const checkoutSession = await axios.post("/api/checkout-session", {
    quantity: 1,
    membershipAmt: Number(membershipAmt),
    membershipName: membershipType,
    membershipDuration: membershipDuration,
  });

  const result = await stripe!.redirectToCheckout({
    sessionId: checkoutSession.data.id,
  });

  if (result.error) {
    alert(result.error.message);
  }
};
export const MembershipTypeCards = ({
  id,
  membershipType,
  membershipAmt,
  membershipDuration,
  membershipAmenities,
}: MembershipsType) => {
  const session = useSession();
  const userId = session?.data?.user.email!;
  const handleBuy = () => {
    // insertMembershipdetails(
    //   userId,
    //   membershipType,
    //   membershipAmt,
    //   membershipDuration,
    //   membershipAmenities
    // ).then((result) => {
    //   if (confirm("Do you want to upgrade the membership?") == true) {
    //     alert(result);
    //   } else {
    //   }
    // });
  };
  return (
    <div className="block max-w-sm p-6 my-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {membershipType}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Price: ${membershipAmt}/Month
      </p>

      <button
        onClick={() =>
          handleStripeInitiation(
            membershipType,
            membershipAmt,
            membershipDuration
          )
        }
        className="bg-lime-100 p-3 mt-3 rounded-xl"
      >
        Get Membership
      </button>
    </div>
  );
};
