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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormDataSchema } from "../../../../../schemas";
import { ReferralInfoType } from "@/types";
// import '../../../../../style.css'

export const Products = () => {
  const [modal, setModal] = useState(true);
  const [email, setEmail] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [error, setError] = useState("");
  const [datas, setData] = useState(0);
  const [totalRewards, setTotalRewards] = useState(100); // Replace with actual data source
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

  const handleInvite = () => {
    // if (validateEmail(email)) {
    //   // Logic to handle the invite
    //   alert(`Invitation sent to ${email}`);
    //   setError('');
    // } else {
    //   setError('Please enter a valid email address');
    // }
    referal(email).then((data) => {
      alert(data);
    });
  };
  useEffect(() => {
    getTotalReferrals().then((data: any) => {
      data.Referals.map((item: any) => {
        setData(datas + Number(item.referAmt));
      });
    });
  }, []);
  console.log(datas);
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
                value={email}
                id="email"
                onChange={handleEmailChange}
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 dark:text-gray-300"
              />
              {/* {errors.firstName?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                    {errors.firstName.message}
                    </p>
                )} */}
            </div>
            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
            <button
              onClick={handleInvite}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 my-1 border border-gray-400 rounded shadow"
            >
              Invite
            </button>
          </div>
        </div>
        <h3 className="font-semibold mt-10 text-gray-900 dark:text-gray-300">
          Your rewards
        </h3>
        <p className="text-gray-900 dark:text-gray-300">${datas}</p>
        <div className="mt-5 mb-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
            >
              Invited by a friend? Enter referral code:
            </label>
            <div className="mb-3">
              <input
                type="text"
                value={referralCode}
                // onChange={handleReferralCodeChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
              {/* {errors.firstName?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                    {errors.firstName.message}
                    </p>
                )} */}
            </div>
            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
            <button
              onClick={handleReferralSubmit}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 my-1 border border-gray-400 rounded shadow"
            >
              Enter
            </button>
          </div>
        </div>
      </div>
      {console.log(modal)}
    </>
  );
};

// "use client";
// import { useState } from 'react';

// export const Products() {
//   const [email, setEmail] = useState('');
//   const [referralCode, setReferralCode] = useState('');
//   const [error, setError] = useState('');
//   const [totalRewards, setTotalRewards] = useState(100); // Replace with actual data source

// //   const handleEmailChange = (e) => {
// //     setEmail(e.target.value);
// //   };

// //   const handleReferralCodeChange = (e) => {
// //     setReferralCode(e.target.value);
// //   };

// //   const validateEmail = (email) => {
// //     const re = /\S+@\S+\.\S+/;
// //     return re.test(email);
// //   };

//   const handleInvite = () => {
//     // if (validateEmail(email)) {
//     //   // Logic to handle the invite
//     //   alert(`Invitation sent to ${email}`);
//     //   setError('');
//     // } else {
//     //   setError('Please enter a valid email address');
//     // }
//   };

//   const handleReferralSubmit = () => {
//     // Logic to handle referral code submission
//     alert(`Referral code ${referralCode} submitted`);
//   };

//   return (
//     <>
//     <div style={{ padding: '20px' }}>
//       <h1>Refer & Earn</h1>
//       <div>
//         <p>Your referral code: <strong>YOURCODE123</strong></p>
//       </div>
//       <div>
//         <label>
//           Invite your friends through email:
//           <input
//             type="text"
//             value={email}
//             // onChange={handleEmailChange}
//             style={{ marginLeft: '10px' }}
//           />
//         </label>
//         <button onClick={handleInvite} style={{ marginLeft: '10px' }}>Invite</button>
//       </div>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <h2>Your Rewards</h2>
//       <div>
//         <p>Total amount of rewards earned: <strong>${totalRewards}</strong></p>
//       </div>
//       <div>
//         <label>
//           Invited by a friend? Enter referral code:
//           <input
//             type="text"
//             value={referralCode}
//             // onChange={handleReferralCodeChange}
//             style={{ marginLeft: '10px' }}
//           />
//         </label>
//         <button onClick={handleReferralSubmit} style={{ marginLeft: '10px' }}>Enter</button>
//       </div>
//     </div>
//     </>
//   );
// }
