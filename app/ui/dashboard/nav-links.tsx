'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Início', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Frequência',
    href: '/dashboard/attendant',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Crianças', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks({ club }: { club: string }) {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;

        if (club === "ursinhos") {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md border border-red-600 p-3 text-sm font-medium text-white hover:text-red-600 hover:bg-red-100 hover:border-none md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-red-100 text-red-600 md:text-red-600 border-none': pathname === link.href,
                },
              )}
            >
              <LinkIcon className={clsx("w-6", {
                'text-red-600': pathname === link.href,
              })} />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        } else if (club === "faisca") {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md border border-yellow-600 p-3 text-sm font-medium text-white hover:text-yellow-600 hover:bg-yellow-100 hover:border-none md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-yellow-100 text-yellow-600 md:text-yellow-600 border-none': pathname === link.href,
                },
              )}
            >
              <LinkIcon className={clsx("w-6", {
                'text-yellow-600': pathname === link.href,
              })} />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        } else if (club === "flama") {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md border border-green-600 p-3 text-sm font-medium text-white hover:text-green-600 hover:bg-green-100 hover:border-none md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-green-100 text-green-600 md:text-green-600 border-none': pathname === link.href,
                },
              )}
            >
              <LinkIcon className={clsx("w-6", {
                'text-green-600': pathname === link.href,
              })} />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        } else if (club === "tocha") {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md border border-blue-600 p-3 text-sm font-medium text-white hover:text-blue-600 hover:bg-blue-100 hover:border-none md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-blue-100 text-blue-600 md:text-blue-600 border-none': pathname === link.href,
                },
              )}
            >
              <LinkIcon className={clsx("w-6", {
                'text-blue-600': pathname === link.href,
              })} />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        } else if (club === "jv") {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md border border-gray-600 p-3 text-sm font-medium text-white hover:text-gray-600 hover:bg-gray-100 hover:border-none md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-gray-100 text-gray-600 md:text-gray-600 border-none': pathname === link.href,
                },
              )}
            >
              <LinkIcon className={clsx("w-6", {
                'text-gray-600': pathname === link.href,
              })} />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        } else if (club === "vq7") {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md border border-gray-700 p-3 text-sm font-medium text-white hover:text-gray-700 hover:bg-gray-200 hover:border-none md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-gray-200 text-gray-700 md:text-gray-700 border-none': pathname === link.href,
                },
              )}
            >
              <LinkIcon className={clsx("w-6", {
                'text-gray-700': pathname === link.href,
              })} />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        } else {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-sky-100 text-blue-600 ': pathname === link.href,
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        }
      })}
    </>
  );
}
