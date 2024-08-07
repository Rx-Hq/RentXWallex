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
import { getMembership } from "../../../../../actions/membership";
import { MembershipNotFound } from "../membershipNotFound";

import { useRouter } from "next/navigation";
export const Payments = () => {
  const { push } = useRouter();

  const session = useSession();
  const user = session.data?.user.name;
  const [userInfo, setUserInfo] = useState<UserInfoType>();
  const [firstInsDate, setFirstInsDate] = useState("");
  const [monthName, setMonthName] = useState("");
  const [paymentDateIndex, setPaymentDateIndex] = useState(0);
  const [firstInsPaid, setFirstInsPaid] = useState(false);
  const [SecondInsPaid, setSecondInsPaid] = useState(false);
  const [secondInsDate, setSecondInsDate] = useState("");
  // let monthName = monthNames[nextMonth];
  let nextMonth = new Date().getMonth() + 1;
  let thisMonth = new Date().getMonth();
  let nextMonthName = monthNames[nextMonth];
  let thisMonthName = monthNames[thisMonth];
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
  let year = new Date().getFullYear();
  const amount = Number(userInfo?.Property_Info[0].rentAmt) / 2;
  const [monthlyRecordInfo, setMonthlyRecordInfo] =
    useState<MonthlyRecordInfoType>();
  useEffect(() => {
    userInfos().then((data: any) => {
      setUserInfo(data);
    });
    // getNextMonthlyRecord(monthName, year).then((data: any) => {
    //   setMonthlyRecordInfo(data);
    // });
    getNextMonthlyRecord(thisMonthName, year).then((data: any) => {
      if (data?.Monthly_Rent_Record.length == 1) {
        if (data?.Monthly_Rent_Record[0].remainingRent == "0") {
          getNextMonthlyRecord(nextMonthName, year).then((data: any) => {
            setMonthlyRecordInfo(data);
            setMonthName(nextMonthName);
            setPaymentDateIndex(0);
            setPaymentDateIndex(1);
          });
        } else {
          setMonthlyRecordInfo(data);
          setMonthName(thisMonthName);
        }
      } else {
        getNextMonthlyRecord(nextMonthName, year).then((data: any) => {
          setMonthlyRecordInfo(data);
          setMonthName(nextMonthName);
          setPaymentDateIndex(1);
        });
      }
      // setThisMonthlyRecordInfo(data);
    });
  }, []);

  useEffect(() => {
    var d = new Date(),
      month = d.getMonth(),
      thursdays = [];
    var c = new Date(d.setMonth(d.getMonth() + paymentDateIndex));

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
  }, [paymentDateIndex]);

  useEffect(() => {
    if (monthlyRecordInfo?.Monthly_Rent_Record.length == 1) {
      if (monthlyRecordInfo?.Monthly_Rent_Record[0].remainingRent == "0") {
        setSecondInsPaid(true);
        setFirstInsPaid(true);
      } else if (
        monthlyRecordInfo?.Monthly_Rent_Record[0].remainingRent !=
        monthlyRecordInfo?.Monthly_Rent_Record[0].totalRent
      ) {
        setFirstInsPaid(true);
      }
    }
  }, [monthlyRecordInfo]);
  if (isMember) {
    return (
      <div className="container">
        <div className="my-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-300 mt-6">
            Payments
          </h2>
          <div className="max-w-[95rem] mx-auto w-full shadow-xl bg-green-100 dark:bg-gray-800 rounded-lg">
            <div className="container mx-auto ">
              <Card>
                <CardBody>
                  <div>
                    {monthlyRecordInfo?.Monthly_Rent_Record.length == 1 && (
                      <>
                        {monthlyRecordInfo.Monthly_Rent_Record[0]
                          .remainingRent == "0" && (
                          <>
                            <div className="flex justify-between items-center px-6">
                              <h1 className="text-xl dark:text-gray-300 px-6">
                                Congratulations! You have completed your
                                payments for {monthName}.
                              </h1>
                            </div>
                          </>
                        )}
                        {monthlyRecordInfo.Monthly_Rent_Record[0]
                          .remainingRent != "0" && (
                          <>
                            <div className="flex justify-between items-center px-6">
                              <h1 className="text-xl dark:text-gray-300 pt-6">
                                Hey <span className="font=bold">{user}</span>,
                                We will pay rent for you on 1st of {monthName}.
                              </h1>
                            </div>

                            <div className="flex justify-between items-center px-6 mb-6">
                              <h1 className="text-xl dark:text-gray-300 pt-6">
                                Your income cycle is {userInfo?.payFreq}.
                              </h1>
                            </div>
                          </>
                        )}

                        {/* <ol className="relative border-s border-gray-500 dark:border-gray-700">
                      <li className="mb-10 ms-4">
                        <div className="absolute w-3 h-3 bg-gray-500 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                          {firstInsDate}
                        </time>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          First Installment
                        </h3>
                        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                          Get access to over 20+ pages including a dashboard
                          layout, charts, kanban board, calendar, and
                          pre-order E-commerce & Marketing pages.
                        </p>
                        <a
                          href="#"
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                        >
                          Learn more{" "}
                          <svg
                            className="w-3 h-3 ms-2 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </a>
                      </li>
                      <li className="mb-10 ms-4">
                        <div className="absolute w-3 h-3 bg-gray-500 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                          {secondInsDate}
                        </time>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Second Installment
                        </h3>
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                          All of the pages and components are first designed
                          in Figma and we keep a parity between the two
                          versions even as we update the project.
                        </p>
                      </li>{" "}
                    </ol> */}
                        <ol className="relative border-s border-gray-500 dark:border-gray-700">
                          {/* <div className="grid grid-cols-2"> */}
                          {!firstInsPaid && (
                            <div className="flex justify-between items-center pt-6 px-6">
                              <InstallmentCard
                                installment="First"
                                firstInsPaid={firstInsPaid}
                                month={monthName}
                                year={year.toString()}
                                rent={userInfo?.Property_Info[0].rentAmt!}
                                amount={amount}
                                date={firstInsDate}
                              />
                            </div>
                          )}
                          {!SecondInsPaid && (
                            <div className="flex justify-between items-center pt-6 px-6">
                              <InstallmentCard
                                installment="Second"
                                firstInsPaid={firstInsPaid}
                                month={monthName}
                                year={year.toString()}
                                rent={userInfo?.Property_Info[0].rentAmt!}
                                amount={amount}
                                date={secondInsDate}
                              />
                            </div>
                          )}
                          {/* </div> */}
                        </ol>
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
  } else {
    push("/home");
  }
};
