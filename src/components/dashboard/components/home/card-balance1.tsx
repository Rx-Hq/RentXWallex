import { Card, CardBody } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Community } from "../icons/community";
import { getTotalInvoices } from "../../../../../actions/monthly-records";

type Props = {
  rent: string;
};

export const CardBalance1 = ({ rent }: Props) => {
  const [TotalInvoices, SetTotalInvoices] = useState(0);
  useEffect(() => {
    getTotalInvoices().then((data: any) => {
      SetTotalInvoices(data);
    });
  }, []);
  return (
    <Card className=" bg-green-100 rounded-xl shadow-xl px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <div className="flex flex-col">
            {/* <span className="text-white">Auto Insurance</span> */}
            <span className="text-black text-sm">Total Borrowings</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-black text-xl font-semibold">
            ${TotalInvoices}
          </span>
          {/* <span className="text-success text-xs">+ 4.5%</span> */}
        </div>
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
