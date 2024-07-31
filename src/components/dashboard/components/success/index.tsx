"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { SessionProvider, useSession } from "next-auth/react";

import { SavePaymentInfo } from "../../../../../actions/payment";
import { insertMembershipdetails } from "../../../../../actions/membership";
import { updateMonthlyRecord } from "../../../../../actions/monthly-records";
import { CardHeader, CardBody, Card } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
type SessionData = {
  id: string;
  amount: number;
  currency: string;
  amount_total: number;
  status: string;
  receipt_email: string;
  metadata: {
    membershipName: string;
    membershipAmt: string;
    membershipDuration: string;
  };
  created: string;
  customer_details: object;
  expires_at: string;
  mode: string;
  payment_intent: string;
  payment_method_options: object;
  payment_method_types: string[];
  payment_status: string;
};

const Success = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sessionId = searchParams?.get("session_id");
  const session = useSession();

  const [sessionData, setSessionData] = useState<SessionData | null>();
  const email = session.data?.user.email!;
  useEffect(() => {
    console.log(email);
    if (sessionId && email != "") {
      const fetchSession = async () => {
        try {
          const response = await axios.get(
            `/api/checkout-session?session_id=${sessionId}`
          );
          console.log(response.data.session.metadata.membershipName);
          setSessionData(response.data.session);
          if (response.data.session.metadata.type == "Rent") {
            SavePaymentInfo(
              response.data.session.metadata.rentAmt,
              response.data.session.metadata.paymentAmt,
              response.data.session.payment_status
            );
            if (response.data.session.payment_status == "paid") {
              updateMonthlyRecord(
                response.data.session.metadata.month,
                response.data.session.metadata.year,
                response.data.session.metadata.paymentAmt,
                response.data.session.metadata.rentAmt
              ).then((data) => {});
            }
          } else {
            insertMembershipdetails(
              response.data.session.metadata.membershipName,
              response.data.session.metadata.membershipAmt,
              response.data.session.metadata.membershipDuration
            );
          }

          // await savePaymentInfo(response.data.session);
          // SavePaymentInfo(
          //   response.data.session.amount_total! / 100,
          //   response.data.session.payment_status
          // )
        } catch (error) {
          console.error(error);
        }
      };

      fetchSession();
    }
  }, [sessionId]);

  // const savePaymentInfo = async (sessionData: SessionData) => {
  //   try {
  //     await axios.post("/api/save-transaction", {
  //       sessionId: sessionData.id,
  //       created: new Date(sessionData.created * 1000).toLocaleString(),
  //       currency: sessionData.currency,
  //       amount_total: sessionData.amount_total,
  //       customer_details: sessionData.customer_details,
  //       customer_email: sessionData.receipt_email,
  //       expires_at: new Date(sessionData.expires_at * 1000).toLocaleString(), // Convert Unix timestamp to human-readable date
  //       // metadata: sessionData.metadata,
  //       mode: sessionData.mode,
  //       payment_intent: sessionData.payment_intent,
  //       payment_method_options: sessionData.payment_method_options,
  //       payment_method_types: sessionData.payment_method_types,
  //       payment_status: sessionData.payment_status,
  //       status: sessionData.status,
  //     });
  //     console.log("Transaction saved successfully");
  //   } catch (error) {
  //     console.error("Error saving transaction:", error);
  //   }
  // };

  return (
    <>
      <Card className=" bg-green-100 rounded-xl shadow-md px-3 w-full">
        <div
          id="default-modal"
          className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-30 z-50 overflow-auto backdrop-blur flex justify-center items-center"
        >
          <div className="relative p-4 w-full  max-w-xl max-h-full">
            <div className="relative bg-white rounded-lg shadow  dark:bg-gray-700">
              <CardHeader className="bg-gray-900 text-white rounded-lg">
                {" "}
                Payment Successful
              </CardHeader>
              <CardBody className="py-5">
                <div className="mt-8">
                  <p className="text-gray-700 dark:text-gray-400">
                    Thank you for your purchase. Your payment was successful!
                  </p>
                  <h2 className="text-xl font-bold mt-4">Payment Summary</h2>
                  <div className="my-4">
                    {sessionData && (
                      <>
                        {sessionData && (
                          <>
                            <p className="text-gray-700 dark:text-gray-400 break-all">
                              <span className="font-bold">Payment ID:</span>{" "}
                              {sessionData.id}
                            </p>
                            <p className="text-gray-700 dark:text-gray-400">
                              <span className="font-bold">Amount: </span>{" "}
                              {sessionData.amount_total / 100}{" "}
                              {sessionData.currency.toUpperCase()}
                            </p>
                            <p className="text-gray-700 dark:text-gray-400">
                              <span className="font-bold">
                                Payment Status:{" "}
                              </span>{" "}
                              {sessionData.payment_status}
                            </p>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <Button
                  variant={"default"}
                  onClick={() => router.push("/home")}
                >
                  OK
                </Button>
              </CardBody>
            </div>
          </div>
        </div>
      </Card>
      {/* <div className="w-full max-w-4xl mx-auto py-12 md:py-16 lg:py-20 min-h-[84vh]">
        <h1 className="text-3xl font-bold tracking-tight">
          Payment Successful
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Thank you for your purchase. Your payment was successful!
        </p>
        <div className="mt-8">
          <h2 className="text-xl font-bold">Order Summary</h2>
          <div className="mt-4">
            {sessionData && (
              <>
                {sessionData && (
                  <>
                    <p className="text-gray-500 dark:text-gray-400">
                      Payment ID: {sessionData.id}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Amount: {sessionData.amount_total / 100}{" "}
                      {sessionData.currency.toUpperCase()}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Payment Status: {sessionData.payment_status}
                    </p>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <button
          className="w-44 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
          onClick={() => router.push("/home")}
        >
          Return to Home
        </button>
      </div> */}
    </>
  );
};

export default Success;
