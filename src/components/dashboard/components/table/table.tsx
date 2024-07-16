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
      <table className="border-separate border-spacing-2">
        <thead className="text-left rounded-xl">
          <tr className="bg-lime-100 text-green-500">
            <th>Date</th>
            <th>Rent Amount</th>
            <th>Payment Amount</th>
            <th>Remaining Amount</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.Payment_Info.map((datas) => (
            <tr className="bg-lime-100 mb-4" key={datas.id}>
              <td>{datas.payemntDate.toString()}</td>
              <td>{datas.rentAmt}</td>
              <td>{datas.paymentAmt}</td>
              <td>{datas.remainingAmt}</td>
              <td>{datas.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
