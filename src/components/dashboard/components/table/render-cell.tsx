import { User, Tooltip, Chip, Button, Spacer } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { users } from "./data";
import { PaymentInfoType } from "@/types";

interface Props {
  user: {
    id: string;
    rentAmt: string;
    paymentAmt: string;
    remainingAmt: string;
    paymentDate: string;
    status: string;
  };
  columnKey: string;
}

export const RenderCell = ({ user, columnKey }: Props) => {
  // @ts-ignore
  console.log(user);
  const cellValue = user[columnKey as keyof typeof user]; // This line is changed to properly access the value

  switch (columnKey) {
    case "status":
      return (
        <Button
          size="sm"
          variant="flat"
          className={
            cellValue === "Paid"
              ? "px-5 py-3 bg-green-200 w-32 sm:w-full rounded-xl"
              : cellValue === "Processing"
              ? "px-5 py-3 bg-violet-300 w-32 sm:w-full rounded-xl"
              : "warning"
          }
        >
          <span className="capitalize text-xs">{cellValue}</span>
        </Button>
      );
    default:
      return <>{cellValue}</>; // Wrapping the default return value in a fragment
  }
};
