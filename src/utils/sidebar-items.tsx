// ICONS
import {
  IconArrowLeft,
  IconBrandTabler,
  IconMessageCircle,
  IconChartArea,
} from '@tabler/icons-react';

type SidebarItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};
export const sidebarItems: SidebarItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: (
      <IconBrandTabler className='h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200' />
    ),
  },
  {
    label: 'Chats',
    href: '#',
    icon: (
      <IconMessageCircle className='h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200' />
    ),
  },
  {
    label: 'Analytics',
    href: '#',
    icon: (
      <IconChartArea className='h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200' />
    ),
  },
  {
    label: 'Logout',
    href: '/api/sign-out',
    icon: (
      <IconArrowLeft className='h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200' />
    ),
  },
];
