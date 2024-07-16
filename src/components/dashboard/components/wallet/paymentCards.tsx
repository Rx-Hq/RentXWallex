import { Avatar, Card, CardBody } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getMembership } from "../../../../../actions/membership";
import { MembershipInfoType } from "@/types";

type Props = {
  custom: () => void;
};

export const PaymentCards = ({ custom }: Props) => {
  const [memInfo, setMemInfo] = useState<MembershipInfoType>();

  const session = useSession();
  const userEmail = session?.data?.user.email!;
  useEffect(() => {
    getMembership(userEmail).then((data: any) => {
      setMemInfo(data);
    });
  }, []);

  return (
    <Card className="block max-w-md p-6 bg-gradient-to-r from-green-500 to-lime-300 border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:hover:bg-gray-700">
      <CardBody className="py-5 gap-6">
        <a onClick={custom} href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {memInfo?.name}
          </h5>

          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            Status:{" "}
            {!memInfo?.Membership_Info[0]
              ? "N/A"
              : memInfo?.Membership_Info[0].membershipStatus}
          </h5>
          <p className="font-bold text-gray-700 dark:text-gray-400">
            {!memInfo?.Membership_Info[0]
              ? "N/A"
              : memInfo?.Membership_Info[0].membershipType}{" "}
            Membership
          </p>
        </a>
      </CardBody>
    </Card>
  );
};
