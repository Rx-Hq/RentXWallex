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
import { useSession } from "next-auth/react";
// import { TrashIcon } from '@radix-ui/react-icons';
// import { DotsIcon } from '../icons/accounts/dots-icon';
// import { ExportIcon } from '../icons/accounts/export-icon';
// import { InfoIcon } from '../icons/accounts/info-icon';
// import { SettingsIcon } from '../icons/sidebar/settings-icon';

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
    <div className="container">
      <div className="my-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-300 mt-6">
          Rental Home
        </h2>

        <div className="max-w-[95rem] mx-auto w-full bg-gray-100 shadow-xl dark:bg-gray-800 rounded-lg">
          <div className="container mx-auto mb-7">
            <div className="flex justify-between items-center py-4 px-6">
              <h1 className="text-xl font-bold dark:text-gray-300 pt-6">
                My Account
              </h1>
            </div>
            <div className="flex justify-between items-center border-b pb-4 dark:border-gray-600 px-8">
              <div className="flex items-center">
                <img
                  className="w-16 h-16 rounded-full mr-4"
                  alt={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                  }
                  src={
                    session.data?.user.image!
                      ? session.data?.user.image!
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                  }
                />
                <div>
                  <p className="text-gray-500 dark:text-gray-400">
                    {propertyInfo?.name}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">Tenent</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  {propertyInfo?.phonenumber}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {propertyInfo?.email}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap px-6 py-1">
              <div className="w-full md:w-1/2 lg:w-1/3 px-2 py-2">
                <p className="font-bold text-gray-700 dark:text-gray-300">
                  Occupants
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  2 Adults & Children
                </p>
              </div>

              <div className="w-full md:w-1/2 lg:w-1/3 px-2 py-2">
                <p className="font-bold text-gray-700 dark:text-gray-300">
                  Employment Status
                </p>
                <p className="text-gray-500 dark:text-gray-400">Full Time</p>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-2 py-2">
                <p className="font-bold text-gray-700 dark:text-gray-300">
                  Job Title
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  {" "}
                  {propertyInfo?.jobTitle}
                </p>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-2 py-2">
                <p className="font-bold text-gray-700 dark:text-gray-300">
                  Company
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  {propertyInfo?.currentEmployer}
                </p>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-2 py-2">
                <p className="font-bold text-gray-700 dark:text-gray-300">
                  {propertyInfo?.payFreq} Income
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  ${propertyInfo?.monthlyIncome}
                </p>
              </div>
              {/* <div className="w-full md:w-1/2 lg:w-1/3 px-2 py-2">
                <p className="font-bold text-gray-700 dark:text-gray-300">
                  Household Income
                </p>
                <p className="text-gray-500 dark:text-gray-400">—</p>
              </div> */}
            </div>
          </div>
        </div>
        <div className="max-w-[95rem] mx-auto w-full bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="container mx-auto dark:bg-gray-700 rounded-lg shadow-xl  py-8 px-12">
            <h1 className="text-xl font-bold dark:text-gray-300 pt-2 pb-8 px-2 py-2">
              Landlord Information
            </h1>
            <div className="flex justify-between items-center border-b pb-4 dark:border-gray-600 px-4">
              <div className="flex items-center">
                <img
                  className="w-16 h-16 rounded-full mr-4"
                  alt={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                  }
                  src={
                    session.data?.user.image!
                      ? session.data?.user.image!
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                  }
                />
                <div>
                  <h2 className="text-xl font-bold dark:text-gray-300">
                    {propertyInfo?.Property_Info[0].managerName}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">Landlord</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  {propertyInfo?.Property_Info[0].propManagerPhone}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {propertyInfo?.Property_Info[0].propManagerEmail}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap px-6 py-1">
              {/* <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">
                Property Details
              </h3> */}
              <div className="w-full md:w-1/2 lg:w-1/3 px-2 py-2">
                <h4 className="font-bold text-gray-700 dark:text-gray-300">
                  Property Address
                </h4>
                <p className="text-gray-500 dark:text-gray-400">
                  {propertyInfo?.Property_Info[0].propAddress}
                </p>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-2 py-2">
                <h4 className="font-bold text-gray-700 dark:text-gray-300">
                  Type
                </h4>
                <p className="text-gray-500 dark:text-gray-400">
                  {propertyInfo?.Property_Info[0].propType}
                </p>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-2 py-2">
                <h4 className="font-bold text-gray-700 dark:text-gray-300">
                  Number of beds
                </h4>
                <p className="text-gray-500 dark:text-gray-400">
                  {propertyInfo?.Property_Info[0].propNoOfBeds}
                </p>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-2 py-2">
                <h4 className="font-bold text-gray-700 dark:text-gray-300">
                  Rent
                </h4>
                <p className="text-gray-500 dark:text-gray-400">
                  ${propertyInfo?.Property_Info[0].rentAmt}
                </p>
              </div>
              {/* <div className="mt-4">
                <h4 className="font-bold text-gray-700 dark:text-gray-300">
                  Amenities
                </h4>
                <ul className="list-disc list-inside text-gray-500 dark:text-gray-400">
                  <li>IN-UNIT LAUNDRY.</li>
                  <li>AIR CONDITIONING AND HEATER.</li>
                  <li>STORAGE SPACE OR LARGE CLOSETS.</li>
                  <li>PATIO OR BALCONY SPACE.</li>
                  <li>DISHWASHER.</li>
                  <li>ENERGY-EFFICIENT APPLIANCES.</li>
                  <li>HIGH-SPEED INTERNET ACCESS.</li>
                  <li>LARGE WINDOWS WITH NATURAL LIGHT.</li>
                  <li>GYM</li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
