"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { TableWrapper } from "../table/table";
import { CardBalance1 } from "./card-balance1";
import { CardBalance2 } from "./card-balance2";
import { CardBalance3 } from "./card-balance3";
import { CardAgents } from "./card-agents";
import { CardTransactions } from "./card-transactions";
import { Link } from "@nextui-org/react";
import NextLink from "next/link";
import Modal from "@/components/auth/modal";
import { applicationCheck } from "../../../../../actions/Application";
import {
  MembershipInfoType,
  MonthlyRecordInfoType,
  PropertyInfoType,
} from "@/types";
import { landlordInfo } from "../../../../../actions/landlord";
import { QuestionCard } from "./question-card";
import { getNextMonthlyRecord } from "../../../../../actions/monthly-records";
import { monthNames } from "@/data/monthNames";
import { getMembership } from "../../../../../actions/membership";

export const Content = () => {
  const [buttonDisable, setButtonDisable] = useState(true);
  useEffect(() => {
    applicationCheck().then((data: any) => {
      console.log(data);
      if (data === null) {
        setButtonDisable(true);
      } else {
        if (data.isApproved === false) {
          setButtonDisable(true);
        } else {
          setButtonDisable(false);
        }
      }
    });
  }, []);
  const Chart = dynamic(
    () => import("../charts/steam").then((mod) => mod.Steam),
    {
      ssr: false,
    }
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  let monthIndex = new Date().getMonth() + 1;
  let monthName = monthNames[monthIndex];
  let year = new Date().getFullYear();
  const [propertyInfo, setPropertyInfo] = useState<PropertyInfoType>();
  const [membershipInfo, setmembershipInfo] = useState<MembershipInfoType>();
  const [monthlyRecordInfo, setMonthlyRecordInfo] =
    useState<MonthlyRecordInfoType>();
  useEffect(() => {
    landlordInfo().then((data: any) => {
      console.log(data);
      setPropertyInfo(data);
    });
    getMembership().then((data: any) => {
      console.log(data);
      setmembershipInfo(data);
    });
    getNextMonthlyRecord(monthName, year).then((data: any) => {
      setMonthlyRecordInfo(data);
    });
  }, []);
  console.log("monthky length", monthlyRecordInfo?.Monthly_Rent_Record.length);
  return (
    <>
      {!buttonDisable && (
        <div className="h-full lg:px-6">
          <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-2 max-w-[w] mx-auto w-full">
            <div className="mt-6 gap-6 flex flex-col w-full">
              {/* Card Section Top */}
              <div className="flex flex-col gap-2">
                <div className="grid md:grid-cols-3 grid-cols-1 gap-2  justify-center w-full">
                  <CardBalance1
                    rent={propertyInfo?.Property_Info[0].rentAmt!}
                  />
                  <CardBalance2
                    rent={propertyInfo?.Property_Info[0].rentAmt!}
                  />
                  <CardBalance3
                    rent={propertyInfo?.Property_Info[0].rentAmt!}
                  />
                </div>
                {monthlyRecordInfo?.Monthly_Rent_Record.length != 1 &&
                  membershipInfo?.Membership_Info.length! > 0 &&
                  membershipInfo?.Membership_Info[0]?.membershipExpireDate! >
                    new Date() && (
                    <div className="grid md:grid-cols-1 grid-cols-1 gap-2  justify-center w-full">
                      <QuestionCard
                        rent={propertyInfo?.Property_Info[0].rentAmt!}
                      />
                    </div>
                  )}
              </div>

              {/* Chart */}
              <div className="h-full border-solid border-4 border-lime-200 flex flex-col gap-2 rounded-2xl m-5">
                <h3 className="text-xl font-semibold p-5">Monthly View</h3>
                <div className="w-full bg-default-50 p-6 ">
                  <Chart />
                </div>
              </div>
            </div>

            {/* Left Section */}
            <div className="mt-4 gap-2 flex flex-col xl:max-w-lg w-full">
              <div className="flex flex-col justify-center gap-4 flex-wrap md:flex-nowrap md:flex-col">
                <CardAgents custom={toggleModal} />
                <CardTransactions />
              </div>
            </div>
          </div>
          <h3 className="text-xl font-semibold p-5">Recent Rent Payments</h3>
          <TableWrapper />
        </div>
      )}
    </>
  );
};
