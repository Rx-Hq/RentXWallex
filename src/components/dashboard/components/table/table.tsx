import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Spacer,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { columns } from "./data";
import { RenderCell } from "./render-cell";
import { PaymentInfoType } from "@/types";
import { PaymentInfo } from "../../../../../actions/payment";
import clsx from "clsx";
import { monthNames } from "@/data/monthNames";

type Props = {
  display: string;
};

export const TableWrapper = (display: Props) => {
  const [data, setData] = useState<PaymentInfoType>();
  useEffect(() => {
    PaymentInfo().then((data: any) => {
      setData(data);
    });
  }, []);

  console.log(data?.Payment_Info);
  return (
    <div className=" w-full flex flex-col gap-4">
      <table className=" m-4 bg-white border-separate border-spacing-y-2">
        <thead className="text-left rounded-xl">
          <tr className="bg-lime-50 m-4 text-green-500 ">
            <th className="py-2 px-4 text-left">Date</th>

            <th className="py-2 px-4 text-left">Transaction ID</th>
            <th className="py-2 px-4 text-left"> Type</th>
            {/* <th className="py-2 px-4  text-left">Rent Amount</th> */}
            <th className="py-2 px-4  text-left"> Amount</th>
            {/* <th className="py-2 px-4 text-left">Payment Status</th> */}
          </tr>
        </thead>
        <tbody>
          {data?.Payment_Info.length! <= 0 && (
            <>
              <tr className="text-center">
                <td>No Records</td>
              </tr>
            </>
          )}
          {display.display == "Transactions" &&
            data?.Payment_Info.map((datas) => (
              <tr className="bg-lime-50 mb-4" key={datas.id}>
                <td className="py-2 px-4">
                  {datas.payemntDate.getDate() +
                    "-" +
                    monthNames[datas.payemntDate.getMonth()] +
                    "-" +
                    datas.payemntDate.getFullYear()}{" "}
                </td>

                <td className="py-2 px-4">{datas.paymentId}</td>
                <td className="py-2 px-4">{datas.paymentType}</td>
                {/* <td className="py-2 px-4">${datas.rentAmt}</td> */}
                {datas.paymentType == "Borrowings" && (
                  <td
                    className={clsx({
                      "py-2 px-4 text-red-700":
                        datas.transactionType == "Debit",
                      "py-2 px-4 text-green-500":
                        datas.transactionType == "Credit",
                    })}
                  >
                    {"$" + datas.rentAmt}
                  </td>
                )}
                {datas.paymentType != "Borrowings" && (
                  <td
                    className={clsx({
                      "py-2 px-4 text-red-700":
                        datas.transactionType == "Debit",
                      "py-2 px-4 text-green-500":
                        datas.transactionType == "Credit",
                    })}
                  >
                    {"$" + datas.paymentAmt}
                  </td>
                )}
              </tr>
            ))}
          {display.display != "Transactions" &&
            data?.Payment_Info.slice(0, 4).map((datas) => (
              <tr className="bg-lime-50 mb-4" key={datas.id}>
                <td className="py-2 px-4">
                  {datas.payemntDate.getDate() +
                    "-" +
                    monthNames[datas.payemntDate.getMonth()] +
                    "-" +
                    datas.payemntDate.getFullYear()}{" "}
                </td>

                <td className="py-2 px-4">{datas.paymentId}</td>
                <td className="py-2 px-4">{datas.paymentType}</td>
                {/* <td className="py-2 px-4">${datas.rentAmt}</td> */}
                {datas.paymentType == "Borrowings" && (
                  <td
                    className={clsx({
                      "py-2 px-4 text-red-700":
                        datas.transactionType == "Debit",
                      "py-2 px-4 text-green-500":
                        datas.transactionType == "Credit",
                    })}
                  >
                    {"$" + datas.rentAmt}
                  </td>
                )}
                {datas.paymentType != "Borrowings" && (
                  <td
                    className={clsx({
                      "py-2 px-4 text-red-700":
                        datas.transactionType == "Debit",
                      "py-2 px-4 text-green-500":
                        datas.transactionType == "Credit",
                    })}
                  >
                    {"$" + datas.paymentAmt}
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
