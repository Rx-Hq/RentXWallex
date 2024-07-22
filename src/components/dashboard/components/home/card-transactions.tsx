import { Avatar, Card, CardBody, Link } from "@nextui-org/react";
import React from "react";
import { TableWrapper } from "../table/table";

export const CardTransactions = () => {
  return (
    <Card className=" bg-default-50 border-solid border-4 border-lime-200 rounded-xl shadow-md px-3">
      <CardBody className="py-5 gap-4">
        <div className="flex gap-2.5 justify-center">
          <div className="flex flex-col py-2 px-6 rounded-xl">
            <h3 className="text-center text-xl font-semibold">
              Recent Rent Payments
            </h3>

            <TableWrapper />
            <div className="text-center">
              <Link
                href="/transactions"
                color="primary"
                className="cursor-pointer"
              >
                View All
              </Link>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
