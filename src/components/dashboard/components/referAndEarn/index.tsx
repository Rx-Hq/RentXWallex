"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import { DotsIcon } from "@/components/icons/accounts/dots-icon";
// import { ExportIcon } from "@/components/icons/accounts/export-icon";
// import { InfoIcon } from "@/components/icons/accounts/info-icon";
// import { TrashIcon } from "@/components/icons/accounts/trash-icon";
// import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
// import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
// import { SettingsIcon } from "@/components/icons/sidebar/settings-icon";
// import { TableWrapper } from "@/components/table/table";
// import { AddUser } from "./add-user";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { UsersIcon } from "../icons/breadcrumb/users-icon";
import { TrashIcon } from "@radix-ui/react-icons";
import { DotsIcon } from "../icons/accounts/dots-icon";
import { ExportIcon } from "../icons/accounts/export-icon";
import { InfoIcon } from "../icons/accounts/info-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { TableWrapper } from "../table/table";
import Modal from "@/components/auth/modal";
import { getTotalReferrals, referal } from "../../../../../actions/referal";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormDataSchema, ReferalToSchema } from "../../../../../schemas";
import { ReferralInfoType } from "@/types";
import { z } from "zod";
// import '../../../../../style.css'
type Inputs = z.infer<typeof ReferalToSchema>;
export const ReferAndEarn = () => {
  const [modal, setModal] = useState(true);
  const [email, setEmail] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [error, setError] = useState("");
  const [datas, setData] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(ReferalToSchema),
  });
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  //   const handleReferralCodeChange = (e) => {
  //     setReferralCode(e.target.value);
  //   };

  //   const validateEmail = (email) => {
  //     const re = /\S+@\S+\.\S+/;
  //     return re.test(email);
  //   };

  const handleInvite: SubmitHandler<Inputs> = (data) => {
    const validatedFields = ReferalToSchema.safeParse(data);

    if (!validatedFields.success) {
      console.log("Error");
    }
    referal(data.referToEmail.toLowerCase()).then((response) => {
      alert(response);
    });
    getTotalReferrals().then((data: any) => {
      console.log(data);
      setData(data);
    });
  };
  useEffect(() => {
    getTotalReferrals().then((data: any) => {
      console.log(data);
      setData(data);
    });
  }, []);

  const handleReferralSubmit = () => {
    // Logic to handle referral code submission
    alert(`Referral code ${referralCode} submitted`);
  };
  return (
    <>
      <div className="container">
        <h1 className="text-3xl font-semibold text-gray-900  mt-8 dark:text-gray-300 ">
          Refer & Earn
        </h1>
        {/* <h3 className="font-semibold mt-10 text-gray-900 dark:text-gray-300">
          Your referral code: <strong>RENTX007</strong>
        </h3> */}
        <h3 className="font-semibold mt-10 text-gray-900 dark:text-gray-300">
          Your rewards
        </h3>
        <p className="text-gray-900 dark:text-gray-300">${datas}</p>
        <form className="" onSubmit={handleSubmit(handleInvite)}>
          <div className="mt-5 mb-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
              >
                Invite your friends through email:
              </label>
              <div className="mb-3">
                <input
                  type="email"
                  id="email"
                  {...register("referToEmail")}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 dark:text-gray-300"
                />
                {errors.referToEmail?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.referToEmail.message}
                  </p>
                )}
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button
                type="submit"
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 my-1 border border-gray-400 rounded shadow"
              >
                Invite
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
