"use client";

import { Label } from "@/components/ui/label";
import { monthNames } from "@/data/monthNames";
import { Card, CardBody } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { userInfos } from "../../../../../actions/userInfo";
import { MonthlyRecordInfoType, UserInfoType } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InstallmentCard } from "./installment-card";
import { getNextMonthlyRecord } from "../../../../../actions/monthly-records";
import { QuestionCard } from "../home/question-card";

export const Payments = () => {
  const session = useSession();
  const user = session.data?.user.name;
  const [userInfo, setUserInfo] = useState<UserInfoType>();
  const [firstInsDate, setFirstInsDate] = useState("");
  const [secondInsDate, setSecondInsDate] = useState("");
  let nextMonth = new Date().getMonth() + 1;
  let monthName = monthNames[nextMonth];
  let year = new Date().getFullYear();
  const amount = Number(userInfo?.Property_Info[0].rentAmt) / 2;
  const [monthlyRecordInfo, setMonthlyRecordInfo] =
    useState<MonthlyRecordInfoType>();
  useEffect(() => {
    userInfos().then((data: any) => {
      setUserInfo(data);
    });
    getNextMonthlyRecord(monthName, year).then((data: any) => {
      setMonthlyRecordInfo(data);
    });
  }, []);
  //console.log(userInfo);

  useEffect(() => {
    var d = new Date(),
      month = d.getMonth(),
      thursdays = [];
    var c = new Date(d.setMonth(d.getMonth() + 1));

    //   console.log(c);
    c.setDate(1);
    month = c.getMonth();
    // Get the first Monday in the month
    while (c.getDay() !== 4) {
      c.setDate(c.getDate() + 1);
    }

    // Get all the other Mondays in the month
    while (c.getMonth() === month) {
      thursdays.push(new Date(c.getTime()));
      c.setDate(c.getDate() + 7);
    }

    // var firstIns = new Date(thursdays[1]);
    // var secondIns = new Date(thursdays[3]);
    setFirstInsDate(thursdays[1].toString());
    setSecondInsDate(thursdays[3].toString());
  }, []);

  return (
    <div className="container">
      <div className="my-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-300 mt-6">
          Payments
        </h2>
        <div className="max-w-[95rem] mx-auto w-full bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="container mx-auto ">
            <Card className="">
              <CardBody>
                <div>
                  {monthlyRecordInfo?.Monthly_Rent_Record.length == 1 && (
                    <>
                      <div className="flex justify-between items-center px-6">
                        <h1 className="text-xl dark:text-gray-300 pt-6">
                          Hey <span className="font=bold">{user}</span>, We will
                          pay rent for you on 1st of {monthName}.
                        </h1>
                      </div>

                      <div className="flex justify-between items-center px-6">
                        <h1 className="text-xl dark:text-gray-300 pt-6">
                          We see your pay frequency is {userInfo?.payFreq}.
                        </h1>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="flex justify-between items-center pt-6 px-6">
                          <InstallmentCard
                            installment="First"
                            month={monthName}
                            year={year.toString()}
                            rent={userInfo?.Property_Info[0].rentAmt!}
                            amount={amount}
                            date={firstInsDate}
                          />
                        </div>
                        <div className="flex justify-between items-center pt-6 px-6">
                          <InstallmentCard
                            installment="Second"
                            month={monthName}
                            year={year.toString()}
                            rent={userInfo?.Property_Info[0].rentAmt!}
                            amount={amount}
                            date={secondInsDate}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {monthlyRecordInfo?.Monthly_Rent_Record.length != 1 && (
                    <>
                      <QuestionCard
                        rent={userInfo?.Property_Info[0].rentAmt.toString()!}
                      />
                    </>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
