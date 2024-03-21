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
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-yellow-100 hover:text-yellow-600 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-yellow-100 text-yellow-600 ': pathname === link.href,
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        } else if (club === "flama") {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-green-100 text-green-600 ': pathname === link.href,
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        } else if (club === "tocha") {
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
        } else if (club === "jv") {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md border border-gray-300 p-3 text-sm font-medium text-black hover:bg-gray-300 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-gray-300 md:bg-gray-300': pathname === link.href,
                },
              )}
            >
              <LinkIcon className={clsx("w-6", {
                'text-black': pathname === link.href,
              })} />
              <p className={clsx("hidden group-hover:text-black md:block", {
                'text-black': pathname === link.href,
                'text-gray-300 ': pathname != link.href,
              })}>{link.name}</p>
            </Link>
          );
        } else if (club === "vq7") {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-white hover:text-black md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-white text-black ': pathname === link.href,
                },
              )}
            >
              <LinkIcon className="w-6" />
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
