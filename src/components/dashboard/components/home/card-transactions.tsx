import { Avatar, Card, CardBody } from "@nextui-org/react";
import React from "react";

export const CardTransactions = () => {
  return (
    <Card className=" bg-default-50 rounded-xl shadow-md px-3">
      <CardBody className="py-5 gap-4">
        <div className="flex gap-2.5 justify-center">
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              Withdrawables and Deposits
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
