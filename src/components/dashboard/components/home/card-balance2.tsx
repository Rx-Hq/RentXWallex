import { Card, CardBody } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Community } from "../icons/community";
import { getTotalPayments } from "../../../../../actions/monthly-records";
type Props = {
  rent: string;
};
export const CardBalance2 = ({ rent }: Props) => {
  const [TotalPayments, SetTotalPayments] = useState(0);
  useEffect(() => {
    getTotalPayments().then((data: any) => {
      SetTotalPayments(data);
    });
  }, []);
  return (
    <Card className="bg-green-100 rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <div className="flex flex-col">
            {/* <span className="text-default-900">Health Insurance</span> */}
            <span className="text-default-900 text-sm">
              Total payment Completed
            </span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-default-900 text-xl font-semibold">
            ${TotalPayments}
          </span>
          {/* <span className="text-danger text-xs">- 4.5%</span> */}
        </div>
        {/* <div className="flex items-center gap-6">
          <div>
            <div>
              <span className="font-semibold text-success-600 text-xs">
                {"↓"}
              </span>
              <span className="text-xs">11,930</span>
            </div>
            <span className="text-default-900 text-xs">USD</span>
          </div>

          <div>
            <div>
              <span className="font-semibold text-danger text-xs">{"↑"}</span>
              <span className="text-xs">54,120</span>
            </div>
            <span className="text-default-900 text-xs">USD</span>
          </div>

          <div>
            <div>
              <span className="font-semibold text-danger text-xs">{"⭐"}</span>
              <span className="text-xs">150</span>
            </div>
            <span className="text-default-900 text-xs">VIP</span>
          </div>
        </div> */}
      </CardBody>
    </Card>
  );
};
