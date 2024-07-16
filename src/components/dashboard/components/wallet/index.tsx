"use client";
import React, { useEffect, useState } from "react";

import { CardAgents } from "../home/card-agents";
import { MembershipTypeCards } from "../membership/membershipTypesCards";
import { getMembershipTypes } from "../../../../../actions/membership";

import { MembershipsType } from "@/types";
import { PaymentCards } from "./paymentCards";

export const Wallet = () => {
  const [modal, setModal] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberships, setMemberships] = useState<[MembershipsType]>();
  // Mock data for user, membership, payment, and plans
  const user = { name: "John Doe", email: "john.doe@example.com" };
  const membership = {
    type: "Elite",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    paymentCycle: "Monthly",
  };
  const payment = { card: "**** **** **** 3889", date: "2023-06-01" };
  const plans = [
    { id: 1, name: "Basic", price: 10 },
    { id: 2, name: "Standard", price: 20 },
    { id: 3, name: "Premium", price: 30 },
  ];

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    getMembershipTypes().then((data: any) => {
      setMemberships(data);
    });
  }, []);

  // useEffect(()=>{
  //   <Modal onClose={()=>setModal(false)}/>
  // },[])
  return (
    <>
      <div className="container">
        <h2 className="text-3xl font-semibold text-gray-900 ml-6 mt-8 dark:text-gray-300">
          Wallet: Add Payment
        </h2>

        <PaymentCards custom={toggleModal} />
        {/* <a
          href="#"
          onClick={toggleModal}
          className="block max-w-sm p-6 m-6 bg-gradient-to-r from-green-500 to-lime-300 border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Zoey
          </h5>
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            **** **** **** 3889
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Elite Membership
          </p>
        </a> */}
        {/* 
        <h2 className="m-6">Select Membership Plan</h2>
        <div className="grid grid-cols-3 gap-4">
          {memberships?.map((mem) => (
            <MembershipTypeCards
              id={mem.id}
              membershipType={mem.membershipType}
              membershipAmt={mem.membershipAmt}
              membershipDuration={mem.membershipDuration}
              membershipAmenities={mem.membershipAmenities}
            />
          ))} */}

        {/* <a
            href="#"
            className="block max-w-sm p-6 m-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              One-Time Payment
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Charge users a one-time payment fee to access the content.
            </p>
          </a> */}
        {/* <a
            href="#"
            className="block max-w-sm p-6 m-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Membership
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Split the full bundle price over several monthly payments.
            </p>
          </a>
          <a
            href="#"
            className="block max-w-sm p-6 m-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </a> */}
        {/* </div> */}
      </div>

      {/* {modal} */}

      {/* Modal */}
      {isModalOpen && (
        <div
          id="default-modal"
          className="fixed top-0 right-0 left-0 z-50 w-full h-full flex justify-center items-center"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Membership Info
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={toggleModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <div className="container mx-auto p-4">
                  <h1 className="text-2xl font-bold mb-4">Membership Info</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* User Info */}
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        User Info
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300">
                        Name: {user.name}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Email: {user.email}
                      </p>
                    </div>

                    {/* Membership Details */}
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        Membership Details
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300">
                        Membership Type: {membership.type}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Start Date: {membership.startDate}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        End Date: {membership.endDate}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Payment Cycle: {membership.paymentCycle}
                      </p>
                    </div>

                    {/* Payment Info */}
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        Payment Info
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300">
                        Last Payment Card: {payment.card}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Last Payment Date: {payment.date}
                      </p>
                    </div>

                    {/* Plan Upgrade */}
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        Upgrade Plan
                      </h2>
                      <ul>
                        {plans.map((plan) => (
                          <li
                            key={plan.id}
                            className="text-gray-700 dark:text-gray-300"
                          >
                            {plan.name} - ${plan.price}
                            <button
                              className="ml-4 px-2 py-1 bg-blue-500 text-white rounded"
                              //onClick={() => handleUpgrade(plan.id)}
                            >
                              Upgrade
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
