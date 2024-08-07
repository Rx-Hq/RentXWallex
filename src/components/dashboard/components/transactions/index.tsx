"use client";
import { Avatar, Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { UsersIcon } from "../icons/breadcrumb/users-icon";
import { userInfos } from "../../../../../actions/userInfo";
import { useEffect, useState } from "react";
import { userInfo } from "os";
import { landlordInfo } from "../../../../../actions/landlord";
import { PropertyInfoType } from "@/types";
import { TableWrapper } from "../table/table";
import { getMembership } from "../../../../../actions/membership";
// import { TrashIcon } from '@radix-ui/react-icons';
// import { DotsIcon } from '../icons/accounts/dots-icon';
// import { ExportIcon } from '../icons/accounts/export-icon';
// import { InfoIcon } from '../icons/accounts/info-icon';
// import { SettingsIcon } from '../icons/sidebar/settings-icon';
import { useRouter } from "next/navigation";
export const Transaction = () => {
  const [propertyInfo, setPropertyInfo] = useState<PropertyInfoType>();
  useEffect(() => {
    landlordInfo().then((data: any) => {
      console.log(data);
      setPropertyInfo(data);
    });
  }, []);
  const { push } = useRouter();
  const [isMember, setIsMember] = useState(true);
  useEffect(() => {
    getMembership().then((data: any) => {
      setIsMember(false);
      if (data?.Membership_Info.length! > 0) {
        if (data?.Membership_Info[0].membershipExpireDate! > new Date()) {
          setIsMember(true);
          console.log(data);
        }
      }
    });
  }, []);
  console.log(isMember);
  if (isMember) {
    return (
      <>
        <div className="container">
          <div className="my-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-300 mt-6">
              Recent Rent Payments
            </h2>
            <TableWrapper />
          </div>
        </div>
      </>
    );
  } else {
    push("/home");
  }
};
