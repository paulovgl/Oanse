import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import Logo from '@/public/logo-oanse';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import { User } from '@/app/lib/definitions';
import clsx from 'clsx';

export default function SideNav({ club: userData }: { club: User }) {
  const typeClub = userData.club.toString()

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className={clsx("mb-2 flex h-20 items-end justify-start rounded-md p-4 md:h-40", {
          'bg-red-600': typeClub === 'ursinhos',
          'bg-yellow-600': typeClub === 'faisca',
          'bg-green-600': typeClub === 'flama',
          'bg-blue-600': typeClub === 'tocha',
          'bg-gray-300': typeClub === 'jv',
          'bg-gray-600': typeClub === 'vq7',
        })}
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <Logo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks club={typeClub} />
        <div className="hidden h-auto w-full grow rounded-md bg-transparent border border-gray-300 md:block"></div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className={clsx("group flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3", {
            'hover:text-red-600 hover:bg-red-100': typeClub === 'ursinhos',
            'hover:text-yellow-600 hover:bg-yellow-100': typeClub === 'faisca',
            'hover:text-green-600 hover:bg-green-100': typeClub === 'flama',
            'hover:text-blue-600 hover:bg-blue-100': typeClub === 'tocha',
            'hover:text-black hover:bg-gray-300 border border-gray-300 bg-transparent': typeClub === 'jv',
            'hover:text-gray-600 hover:bg-gray-100': typeClub === 'vq7',
          })}>
            <PowerIcon className={clsx("w-6", {
              'hover:text-red-600 hover:bg-red-100': typeClub === 'ursinhos',
              'hover:text-yellow-600 hover:bg-yellow-100': typeClub === 'faisca',
              'hover:text-green-600 hover:bg-green-100': typeClub === 'flama',
              'hover:text-blue-600 hover:bg-blue-100': typeClub === 'tocha',
              'text-white group-hover:text-black': typeClub === 'jv',
              'hover:text-gray-600 hover:bg-gray-100': typeClub === 'vq7',
            })} />
            <p className={clsx("hidden md:block", {
              'hover:text-red-600 hover:bg-red-100': typeClub === 'ursinhos',
              'hover:text-yellow-600 hover:bg-yellow-100': typeClub === 'faisca',
              'hover:text-green-600 hover:bg-green-100': typeClub === 'flama',
              'hover:text-blue-600 hover:bg-blue-100': typeClub === 'tocha',
              'text-gray-300 group-hover:text-black': typeClub === 'jv',
              'hover:text-gray-600 hover:bg-gray-100': typeClub === 'vq7',
            })}>Sair</p>
          </button>
        </form>
      </div>
    </div>
  );
}
