import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React, { useEffect, useState, useTransition } from "react";
import { Community } from "../icons/community";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { monthNames } from "@/data/monthNames";
import {
  getNextMonthlyRecord,
  insertMonthlyRecord,
} from "../../../../../actions/monthly-records";
import { InstallmentCard } from "../payments/installment-card";
import { userInfos } from "../../../../../actions/userInfo";
import { useSession } from "next-auth/react";
import { MonthlyRecordInfoType, UserInfoType } from "@/types";

type Props = {
  rent: string;
};

export const QuestionCard = ({ rent }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);
  let monthIndex = new Date().getMonth() + 1;
  let monthName = monthNames[monthIndex];
  let year = new Date().getFullYear();
  let rentPaid = 0;
  let remainingRent = rent;
  let totalRent = rent;
  const handleSetup = () => {
    startTransition(() => {
      insertMonthlyRecord(
        monthName,
        year,
        rentPaid,
        remainingRent,
        totalRent
      ).then((data) => {
        console.log(data);
        setShowModal(true);
      });
    });
  };
  const handleModal = () => {
    startTransition(() => {
      // insertMonthlyRecord(
      //   monthName,
      //   year,
      //   rentPaid,
      //   remainingRent,
      //   totalRent
      // ).then((data) => {
      //   console.log(data);
      //   setShowModal(true);
      // });
      setShowModal(!showModal);
    });
  };

  return (
    <Card className=" bg-green-100 rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <div className="flex flex-col mb-5">
            {/* <span className="text-white">Auto Insurance</span> */}
            <span className="text-center text-black text-lg">
              Would you like RentXWallet to pay rent for {monthName}?
            </span>
          </div>
        </div>{" "}
        <Button onClick={handleModal} variant="default" size="lg">
          Yes
        </Button>
      </CardBody>

      {showModal && (
        <div
          id="default-modal"
          className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-30 z-50 overflow-auto backdrop-blur flex justify-center items-center"
        >
          <div className="relative p-4 w-full  max-w-xl max-h-full">
            <div className="relative bg-white rounded-lg shadow  dark:bg-gray-700">
              <CardHeader> Do you want to continue? </CardHeader>
              <CardBody className="py-5">
                <div className="">
                  <div className=" mb-5">
                    {/* <span className="text-white">Auto Insurance</span> */}
                    <span className="text-black">
                      We will pay rent on your behalf on 1st of {monthName}.
                    </span>
                    <p>
                      You will need to pay two installments of $
                      {Number(totalRent) / 2}
                    </p>
                    <p></p>
                  </div>
                </div>{" "}
                <div className="grid grid-cols-2 gap-4">
                  {" "}
                  <Button variant="default" size="lg">
                    <Link onClick={handleSetup} href={"/payments"}>
                      Yes
                    </Link>
                  </Button>
                  <Button onClick={handleModal} variant="default" size="lg">
                    Cancel
                  </Button>
                </div>
              </CardBody>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
