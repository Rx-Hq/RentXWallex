import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/home',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: 'Rental Home',
    path: '/home',
    icon: <Icon icon="lucide:book-text" width="24" height="24" />,
  },
  {
    title: 'Memberhip Acount',
    path: '/home',
    icon: <Icon icon="lucide:list-todo" width="24" height="24" />,
  },
  {
    title: 'My Application',
    path: '/home',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: 'Payment Setup',
    path: '/home',
    icon: <Icon icon="lucide:circle-dollar-sign" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Automated Payment', path: '/home' },
      { title: 'Bank Detail', path: '/home' },
      { title: 'Debit/Credit Card', path: '/home' },
      { title: 'Payment History', path: '/home' },
    ],
  },
  {
    title: 'Credit History',
    path: '/home',
    icon: <Icon icon="lucide:history" width="24" height="24" />,
  },
  {
    title: 'Refer & Earn',
    path: '/home',
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
  {
    title: 'Settings',
    path: '/home',
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Account', path: '/home' },
      { title: 'Privacy', path: '/home' },
    ],
  },

];
