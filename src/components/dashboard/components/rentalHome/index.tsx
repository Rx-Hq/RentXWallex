"use client";

import { useEffect, useState } from "react";

import { landlordInfo } from "../../../../../actions/landlord";
import { PropertyInfoType } from "@/types";
import { useSession } from "next-auth/react";

export const RentalHome = () => {
  const session = useSession();
  const [propertyInfo, setPropertyInfo] = useState<PropertyInfoType>();

  useEffect(() => {
    landlordInfo().then((data: any) => {
      console.log(data);
      setPropertyInfo(data);
    });
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="my-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-300 mt-6">
          My Apartment
        </h2>

        <div className="max-w-[95rem] mx-auto w-full bg-green-100 shadow-xl dark:bg-gray-800 rounded-lg">
          <div className="container mx-auto mb-7 px-8">
            <div className="flex justify-between items-center py-4 px-6">
              <h1 className="text-xl font-bold dark:text-gray-300 pt-6">
                My Account
              </h1>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-green-400 border-b pb-4 dark:border-gray-600 px-8">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div>
                  <p className="text-gray-900 font-bold dark:text-gray-400">
                    {propertyInfo?.name}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400">Tenant</p>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end text-left md:text-right mt-4 md:mt-0">
                <p className="dark:text-gray-300 font-medium">
                  {propertyInfo?.phonenumber}
                </p>
                <p className="dark:text-gray-300">{propertyInfo?.email}</p>
              </div>
            </div>

            <div className="flex flex-wrap px-6 py-1">
              <div className="w-full md:w-1/2 lg:w-1/3 px-2 py-2">
                <p className="font-bold text-gray-700 dark:text-gray-300">
                  Employment Status
                </p>
                <p className="text-gray-700 dark:text-gray-400">
                  {propertyInfo?.empStatus}
                </p>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-2 py-2">
                <p className="font-bold text-gray-700 dark:text-gray-300">
                  Job Title
                </p>
                <p className="text-gray-700 dark:text-gray-400">
                  {propertyInfo?.jobTitle}
                </p>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-2 py-2">
                <p className="font-bold text-gray-700 dark:text-gray-300">
                  Company
                </p>
                <p className="text-gray-700 dark:text-gray-400">
                  {propertyInfo?.currentEmployer}
                </p>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-2 py-2">
                <p className="font-bold text-gray-700 dark:text-gray-300">
                  {propertyInfo?.payFreq} Income
                </p>
                <p className="text-gray-700 dark:text-gray-400">
                  ${propertyInfo?.monthlyIncome}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[95rem] mx-auto w-full bg-green-100 dark:bg-gray-800 rounded-lg">
          <div className="container mx-auto dark:bg-gray-700 rounded-lg shadow-xl py-8 px-12">
            <h1 className="text-xl font-bold dark:text-gray-300 pt-2 pb-8 px-2 py-2">
              Landlord Information
            </h1>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-green-400 border-b pb-4 dark:border-gray-600 px-4">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div>
                  <h2 className="text-xl font-bold dark:text-gray-300">
                    {propertyInfo?.Property_Info[0].managerName}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-400">Landlord</p>
                </div>
              </div>
              <div className="flex flex-col text-left md:text-right mt-4 md:mt-0">
                <p className="dark:text-gray-300 font-medium">
                  {propertyInfo?.Property_Info[0].propManagerPhone}
                </p>
                <p className="dark:text-gray-300">
                  {propertyInfo?.Property_Info[0].propManagerEmail}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap py-1">
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 py-2">
                <h4 className="font-bold text-gray-700 dark:text-gray-300">
                  Property Address
                </h4>
                <p className="text-gray-700 dark:text-gray-400">
                  {propertyInfo?.Property_Info[0].propAddress}
                </p>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 py-2">
                <h4 className="font-bold text-gray-700 dark:text-gray-300">
                  Type
                </h4>
                <p className="text-gray-700 dark:text-gray-400">
                  {propertyInfo?.Property_Info[0].propType}
                </p>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 py-2">
                <h4 className="font-bold text-gray-700 dark:text-gray-300">
                  Number of beds
                </h4>
                <p className="text-gray-700 dark:text-gray-400">
                  {propertyInfo?.Property_Info[0].propNoOfBeds}
                </p>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 py-2">
                <h4 className="font-bold text-gray-700 dark:text-gray-300">
                  Rent
                </h4>
                <p className="text-gray-700 dark:text-gray-400">
                  ${propertyInfo?.Property_Info[0].rentAmt}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
