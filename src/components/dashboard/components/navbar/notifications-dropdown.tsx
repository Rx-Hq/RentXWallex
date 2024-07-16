import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  NavbarItem,
} from '@nextui-org/react';
import React from 'react';
import { NotificationIcon } from '../icons/navbar/notificationicon';

export const NotificationsDropdown = () => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <NavbarItem>
          <NotificationIcon />
        </NavbarItem>
      </DropdownTrigger>
      <DropdownMenu
        className="w-80 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg mb-0"
        aria-label="Avatar Actions"
      >
        <DropdownSection
          title="Notifications"
          className="w-80 bg-white py-4 px-4 dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg mb-0 border border-gray-200 dark:border-gray-700"
        >
          <DropdownItem
            classNames={{
              base: 'py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200',
              title: 'text-base font-semibold text-gray-900 dark:text-gray-100',
            }}
            key="1"
            description="Update your profile information."
          >
            📣 Edit your information
          </DropdownItem>
          <DropdownItem
            key="2"
            classNames={{
              base: 'py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200',
              title: 'text-base font-semibold text-gray-900 dark:text-gray-100',
            }}
            description="Switch to paperless receipts."
          >
            🚀 Say goodbye to paper receipts!
          </DropdownItem>
          <DropdownItem
            key="3"
            classNames={{
              base: 'py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200',
              title: 'text-base font-semibold text-gray-900 dark:text-gray-100',
            }}
            description="Update your profile information."
          >
            📣 Edit your information
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
