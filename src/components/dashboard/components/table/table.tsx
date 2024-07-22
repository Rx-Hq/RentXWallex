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

export const TableWrapper = () => {
  const [data, setData] = useState<PaymentInfoType>();
  useEffect(() => {
    PaymentInfo().then((data: any) => {
      setData(data);
    });
  }, []);

  console.log(data?.Payment_Info);
  return (
    <div className=" w-full flex flex-col gap-4">
      {/* <Table
        aria-label="Example table with custom cells"
        className="border-separate border-spacing-2"
      >
        <TableHeader columns={columns} className="text-left rounded-xl">
          {(column) => (
            <TableColumn
              className="bg-lime-100 text-green-500"
              key={column.uid}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={data?.Payment_Info}>
          {(item: any) => (
            <TableRow className="bg-lime-100 mb-4">
              {(columnKey) => (
                <TableCell className="gap-y-4">
                  {RenderCell({ user: item, columnKey: columnKey })}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table> */}
      <table className=" m-4 bg-white border-separate border-spacing-y-2">
        <thead className="text-left rounded-xl">
          <tr className="bg-lime-50 m-4 text-green-500 ">
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4  text-left">Rent Amount</th>
            <th className="py-2 px-4  text-left">Payment Amount</th>
            <th className="py-2 px-4 text-left">Payment Status</th>
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
          {data?.Payment_Info.map((datas) => (
            <tr className="bg-lime-50 mb-4" key={datas.id}>
              <td className="py-2 px-4">
                {datas.payemntDate.getDate() +
                  "-" +
                  monthNames[datas.payemntDate.getMonth()] +
                  "-" +
                  datas.payemntDate.getFullYear()}{" "}
              </td>
              <td className="py-2 px-4">${datas.rentAmt}</td>
              <td className="py-2 px-4">${datas.paymentAmt}</td>
              <td
                className={clsx({
                  "py-2 px-4 text-red-700": datas.status == "processing",
                  "py-2 px-4 text-green-500": datas.status == "paid",
                })}
              >
                {datas.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
