import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { monthNames } from "@/data/monthNames";
import { insertMonthlyRecord } from "../../../../../actions/monthly-records";

type Props = {
  rent: string;
};

export const QuestionCard = ({ rent }: Props) => {
  let monthIndex = new Date().getMonth() + 1;
  let monthName = monthNames[monthIndex];
  let year = new Date().getFullYear();
  let rentPaid = 0;
  let remainingRent = rent;
  let totalRent = rent;
  const handleSetup = () => {
    insertMonthlyRecord(
      monthName,
      year,
      rentPaid,
      remainingRent,
      totalRent
    ).then((data) => {
      console.log(data);
    });
  };

  return (
    <Card className=" bg-green-100 rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <div className="flex flex-col mb-5">
            {/* <span className="text-white">Auto Insurance</span> */}
            <span className="text-center text-black text-lg">
              Set up Payment for {monthName}
            </span>
          </div>
        </div>{" "}
        <Button variant="default" size="lg">
          <Link onClick={handleSetup} href={"/payments"}>
            Setup
          </Link>
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
