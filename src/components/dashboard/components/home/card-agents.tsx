import { Avatar, AvatarGroup, Card, CardBody } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getMembership } from "../../../../../actions/membership";
import { MembershipInfoType, MembershipsType } from "@/types";
import { monthNames } from "@/data/monthNames";

type Props = {
  custom: () => void;
};

export const CardAgents = ({ custom }: Props) => {
  const [memInfo, setMemInfo] = useState<MembershipInfoType>();
  const session = useSession();

  useEffect(() => {
    getMembership().then((data: any) => {
      setMemInfo(data);
    });
  }, []);
  console.log(memInfo?.Membership_Info);
  return (
    <Card className="block  p-2 bg-gradient-to-r from-green-500 to-lime-300 border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:hover:bg-gray-700">
      <CardBody className=" gap-3">
        <a onClick={custom} href="#">
          <div className="flex items-center">
            <img
              className="h-16 w-16  rounded-full mr-4"
              alt={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
              }
              src={
                session.data?.user.image!
                  ? session.data?.user.image!
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
              }
            />
            <h5 className="m-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {memInfo?.name}
            </h5>
          </div>

          <h5 className="mt-5 text-lg font-bold  text-gray-900 dark:text-gray-400">
            {memInfo?.Membership_Info.length! <= 0 ||
            memInfo?.Membership_Info[0].membershipExpireDate! < new Date()
              ? ""
              : memInfo?.Membership_Info[0].membershipType}{" "}
          </h5>
          <h5 className="font-bold tracking-tight text-gray-900 dark:text-white">
            Status:{" "}
            {memInfo?.Membership_Info.length! <= 0 ||
            memInfo?.Membership_Info[0].membershipExpireDate! < new Date()
              ? "Not a member."
              : "Active"}
          </h5>
          <h5 className="font-bold tracking-tight text-gray-900 dark:text-white">
            Expires on{" "}
            {memInfo?.Membership_Info.length! <= 0 ||
            memInfo?.Membership_Info[0].membershipExpireDate! < new Date()
              ? ""
              : monthNames[
                  memInfo?.Membership_Info[0].membershipExpireDate.getMonth()!
                ] +
                " " +
                memInfo?.Membership_Info[0].membershipExpireDate.getDate() +
                " " +
                memInfo?.Membership_Info[0].membershipExpireDate.getFullYear()}{" "}
          </h5>
        </a>
      </CardBody>
    </Card>
  );
};
