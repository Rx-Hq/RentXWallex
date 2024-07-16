"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import { DotsIcon } from "@/components/icons/accounts/dots-icon";
// import { ExportIcon } from "@/components/icons/accounts/export-icon";
// import { InfoIcon } from "@/components/icons/accounts/info-icon";
// import { TrashIcon } from "@/components/icons/accounts/trash-icon";
// import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
// import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
// import { SettingsIcon } from "@/components/icons/sidebar/settings-icon";
// import { TableWrapper } from "@/components/table/table";
import { AddUser } from "./add-user";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { UsersIcon } from "../icons/breadcrumb/users-icon";
import { TrashIcon } from "@radix-ui/react-icons";
import { DotsIcon } from "../icons/accounts/dots-icon";
import { ExportIcon } from "../icons/accounts/export-icon";
import { InfoIcon } from "../icons/accounts/info-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { TableWrapper } from "../table/table";
import Modal from "@/components/auth/modal";

export const Accounts = () => {
  const [modal,setModal] = useState(true);
  // useEffect(()=>{
  //   <Modal onClose={()=>setModal(false)}/>
  // },[])
  return (
    <><div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">

      <h3 className="text-xl font-semibold">All Transactions</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search" />
          <SettingsIcon />
          <TrashIcon />
          <InfoIcon />
          <DotsIcon />
        </div>
        {/* <div className="flex flex-row gap-3.5 flex-wrap">
          <AddUser />
          <Button color="primary" startContent={<ExportIcon />}>
            Export to CSV
          </Button>
        </div> */}
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper />
      </div>
    </div>
    {console.log(modal)}
    
    </>
  );
};
