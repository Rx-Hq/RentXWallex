import { Input, Link, Navbar, NavbarContent } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FeedbackIcon } from "../icons/navbar/feedback-icon";
import { GithubIcon } from "../icons/navbar/github-icon";
import { SupportIcon } from "../icons/navbar/support-icon";
import { SearchIcon } from "../icons/searchicon";
import { BurguerButton } from "./burguer-button";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";
import { userInfo } from "../../../../../actions/userInfo";
import { auth } from "../../../../../auth";
import { SessionProvider, useSession } from "next-auth/react";
import Application from "@/app/(protected)/application/page";
import { applicationCheck } from "../../../../../actions/Application";
import { ApplicationIcon } from "../icons/navbar/application.-icon";
import { NotificationIcon } from "../icons/navbar/notificationicon";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  const session = useSession();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [buttonDisable, setButtonDisable] = useState(false);

  useEffect(() => {
    applicationCheck().then((data: any) => {
      console.log(data);
      if (data === null) {
        setIsModalOpen(true);
        setButtonDisable(true);
      } else {
        if (data.isApproved === false) {
          setIsModalOpen(true);
          setButtonDisable(true);
        } else {
          setIsModalOpen(false);
          setButtonDisable(false);
        }
      }
    });
  }, []);
  const handleModal = () => {
    if (isModalOpen === false) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
    console.log(isModalOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        style={{
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden">
          {/* <h5>Hi Zoey, <span className="text-2xl">Welcome Back</span></h5> */}
          <div>
            <SessionProvider>
              <h5>Hi {session.data?.user.name},</h5>
            </SessionProvider>
            <span className="text-2xl">Welcome Back</span>
          </div>
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          <div className="flex items-center gap-2 max-md:hidden"></div>
          <button
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Application form"
            onClick={handleModal}
          >
            <ApplicationIcon />
          </button>
          <Tooltip id="my-tooltip" />
          {/* <NotificationsDropdown /> */}

          <div className="max-md:hidden"></div>

          <NavbarContent>
            <UserDropdown />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {isModalOpen && (
        <>
          <div
            id="default-modal"
            className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-30 z-50 overflow-auto backdrop-blur flex justify-center items-center"
          >
            <div className="relative p-4 w-full  max-w-7xl max-h-full">
              <div className="relative bg-white rounded-lg shadow  dark:bg-gray-700">
                <section className="application-section inset-1 flex flex-col justify-between p-10">
                  {/* steps */}
                  <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                    My Application
                  </h2>
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
                  <Application />
                </section>
              </div>
            </div>
          </div>
        </>
      )}
      {children}
    </div>
  );
};
