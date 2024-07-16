"use client";
import React, { useEffect, useState } from "react";
import { auth } from "../../../../auth";
import { NewPasswordSchema } from "../../../../schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, useFormState } from "react-hook-form";
import { getUserByEmail } from "@/data/user";
import { useSession } from "next-auth/react";
import { changePassword } from "../../../../actions/userInfo";
import { checkPassword } from "../../../../actions/checklogin";
type Inputs = z.infer<typeof NewPasswordSchema>;
const Settings = () => {
  const session = useSession();
  const [oldPass, setOldPass] = useState("");
  const [error, setError] = useState<string | undefined>("");
  const [isSamePassword, setIsSamePassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(NewPasswordSchema),
  });

  const processForm: SubmitHandler<Inputs> = (data1) => {
    // event.preventDefault();
    // Check if all checkboxes are checked
    setIsSamePassword(false);
    checkPassword(oldPass).then((result) => {
      setIsSamePassword(result);
      if (result) {
        changePassword(data1).then((result) => {
          console.log(result);
          alert("Password has been changed.");
          reset();
        });
      } else {
        setError("Current password does not match");
        reset();
      }
    });
  };

  const handleOldPass = (event: any) => {
    setError("");
    setOldPass(event.target.value);
  };

  return (
    <>
      <div className="container">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-300 mt-6">
          Settings
        </h2>
        <h5 className="font-semibold mt-6 text-gray-900 dark:text-gray-300">
          Change Password
        </h5>
        <form className="" onSubmit={handleSubmit(processForm)}>
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
              >
                Enter current Password
              </label>
              <div className="mb-3">
                <input
                  type="password"
                  id="oldpassword"
                  {...register("oldpassword")}
                  autoComplete="oldpassword"
                  className="block w-full rounded-md border-0 py-1.5 p-4 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  onChange={handleOldPass}
                />
                {/* {errors.firstName?.message && (
                <p className='mt-2 text-sm text-red-400'>
                  {errors.firstName.message}
                </p>
              )} */}
                <span className="text-red-500 text-sm">{error}</span>
              </div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
              >
                Enter new Password
              </label>
              <div className="mb-3">
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  autoComplete="password"
                  className="block w-full rounded-md border-0 py-1.5 p-4 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
                {errors.password?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
              >
                Re-Enter new Password
              </label>
              <div className="mb-3">
                <input
                  type="password"
                  id="repassword"
                  {...register("repassword")}
                  autoComplete="repassword"
                  className="block w-full rounded-md border-0 py-1.5 p-4 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
                {errors.repassword?.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.repassword.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 my-1 border border-gray-400 rounded shadow"
              >
                Change
              </button>
            </div>
          </div>
        </form>
        {/* <h5 className="font-semibold mt-10 text-gray-900 dark:text-gray-300">
          Notification Settings
        </h5>
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <div className="flex mb-3">
              <label
                htmlFor="emailNotifications"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300 pr-3"
              >
                Email Notifications
              </label>
              <input
                type="checkbox"
                id="emailNotifications"
                className="rounded border-gray-300 text-sky-600 shadow-sm focus:ring-sky-600"
              />
            </div>

            <div className="flex mb-3">
              <label
                htmlFor="smsNotifications"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300 pr-3"
              >
                SMS Notifications
              </label>
              <input
                type="checkbox"
                id="smsNotifications"
                className="rounded border-gray-300 text-sky-600 shadow-sm focus:ring-sky-600"
              />
            </div>

            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 my-1 border border-gray-400 rounded shadow">
              Update Settings
            </button>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Settings;
