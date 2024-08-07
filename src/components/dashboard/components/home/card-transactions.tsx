import { Avatar, Card, CardBody, Link } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { TableWrapper } from "../table/table";
import { InstallmentCard } from "../payments/installment-card";
import { monthNames } from "@/data/monthNames";
import { UserInfoType, MonthlyRecordInfoType } from "@/types";
import { useSession } from "next-auth/react";
import { getNextMonthlyRecord } from "../../../../../actions/monthly-records";
import { userInfos } from "../../../../../actions/userInfo";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getMembership } from "../../../../../actions/membership";

export const CardTransactions = () => {
  const session = useSession();
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
  const user = session.data?.user.name;
  const [userInfo, setUserInfo] = useState<UserInfoType>();
  const [firstInsDate, setFirstInsDate] = useState("");
  const [firstInsPaid, setFirstInsPaid] = useState(false);
  const [SecondInsPaid, setSecondInsPaid] = useState(false);
  const [secondInsDate, setSecondInsDate] = useState("");
  const [monthName, setMonthName] = useState("");
  const [paymentDateIndex, setPaymentDateIndex] = useState(0);
  let nextMonth = new Date().getMonth() + 1;
  let thisMonth = new Date().getMonth();
  let nextMonthName = monthNames[nextMonth];
  let thisMonthName = monthNames[thisMonth];
  let year = new Date().getFullYear();
  const amount = Number(userInfo?.Property_Info[0].rentAmt) / 2;
  const [monthlyRecordInfo, setMonthlyRecordInfo] =
    useState<MonthlyRecordInfoType>();
  useEffect(() => {
    userInfos().then((data: any) => {
      setUserInfo(data);
    });
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
      <Card className=" bg-default-50 border-solid border-4 border-lime-200 rounded-xl shadow-md px-3">
        <CardBody className="py-5 gap-4">
          <div className="flex gap-2.5 justify-center">
            <div className="flex flex-col py-2 px-6 rounded-xl">
              <h3 className="text-center text-xl font-semibold">
                Installments
              </h3>

              {monthlyRecordInfo?.Monthly_Rent_Record.length != 1 && (
                <>
                  <div className="text-center text-xl">
                    <h2>No Installments</h2>
                  </div>
                </>
              )}
              {monthlyRecordInfo?.Monthly_Rent_Record.length == 1 && (
                <ol className="relative border-s border-gray-500 dark:border-gray-700">
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
                  {firstInsPaid && !SecondInsPaid && (
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
                </ol>
              )}
              {firstInsPaid && SecondInsPaid && (
                <>
                  <div className="text-center text-xl">
                    <h2>All Installments Paid</h2>
                  </div>
                </>
              )}
              <div className="text-center">
                <Button variant={"default"}>
                  <Link
                    href="/payments"
                    color="primary"
                    className="cursor-pointer text-white"
                  >
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  } else {
    return <></>;
  }
};
