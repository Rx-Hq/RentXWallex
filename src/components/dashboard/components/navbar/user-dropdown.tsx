import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import React, { useState } from "react";
import { DarkModeSwitch } from "./darkmodeswitch";
import { SignOut } from "../../../../../actions/signout";
import { userInfo } from "../../../../../actions/userInfo";
import { auth } from "../../../../../auth";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const UserDropdown = () => {
  const session = useSession();
  const OAuth = session.data?.user.isOAuth;
  console.log(session);
  const handleSignout = () => {
    SignOut();
  };
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <div className="relative grid select-none items-center whitespace-nowrap rounded-full text-xs font-bold uppercase">
            <div className="absolute top-2/4 left-1.5 h-5 w-5 -translate-y-2/4">
              <img
                alt={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                }
                src={
                  session.data?.user.image!
                    ? session.data?.user.image!
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                }
                className="relative inline-block h-full w-full -translate-x-0.5 !rounded-full  object-cover object-center"
              />
            </div>
            <span className="ml-[30px]">
              <p className="block font-sans text-sm antialiased font-medium leading-none capitalize">
                {session.data?.user.name}
              </p>
            </span>
          </div>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
        className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg py-4 px-4 border border-gray-200 dark:border-gray-700"
      >
        <DropdownItem
          key="profile"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>Signed in as</p>
          <p>{session.data?.user.email}</p>
        </DropdownItem>

        <DropdownItem key="settings">
          <Link href="/settings">Change Password</Link>
        </DropdownItem>

        {/* <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
        <DropdownItem
          onClick={handleSignout}
          key="logout"
          color="danger"
          className="text-danger"
        >
          Signout
        </DropdownItem>
        <DropdownItem key="switch">
          <DarkModeSwitch />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
