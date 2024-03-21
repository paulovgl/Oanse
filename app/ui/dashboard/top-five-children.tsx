import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchTopFiveChildren } from '@/app/lib/data';
import { formatDateToLocal } from '@/app/lib/utils';
import { TopFiveChildrenSkeleton } from '../skeletons';

export default async function TopFiveChildren({ currentUserClub }: { currentUserClub: string }) {
  const childrenTopFive = await fetchTopFiveChildren(currentUserClub);

  if (childrenTopFive != undefined) {
    return (
      <div className="flex w-full flex-col md:col-span-4">
        <h2 className={`${lusitana.className} text-white mb-4 text-xl md:text-2xl`}>
          Top Oansistas
        </h2>
        <div className={clsx("flex grow flex-col justify-between rounded-xl p-4", {
          'bg-red-300': currentUserClub === 'ursinhos',
          'bg-yellow-300': currentUserClub === 'faisca',
          'bg-green-300': currentUserClub === 'flama',
          'bg-blue-300': currentUserClub === 'tocha',
          'bg-gray-300': currentUserClub === 'jv',
          'bg-gray-400': currentUserClub === 'vq7',
        })}>
          <div className={clsx("rounded px-6", {
            'bg-red-200': currentUserClub === 'ursinhos',
            'bg-yellow-200': currentUserClub === 'faisca',
            'bg-green-200': currentUserClub === 'flama',
            'bg-blue-200': currentUserClub === 'tocha',
            'bg-gray-200': currentUserClub === 'jv',
            'bg-gray-300': currentUserClub === 'vq7',
          })}>
            {childrenTopFive.map((child, i) => {
              return (
                <div
                  key={child.id}
                  className={clsx(
                    'flex flex-row items-center justify-between py-4',
                    {
                      'border-t-black border': i !== 0,
                    },
                  )}
                >
                  <div className="flex items-center">
                    <Image
                      src={"/customers/emil-kowalski.png"}
                      alt={`${child.name}'s profile picture`}
                      className="mr-4 rounded-full"
                      width={32}
                      height={32}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold md:text-base">
                        {child.name}
                      </p>
                      <p className="hidden text-sm text-gray-500 sm:block">
                        {formatDateToLocal(child.birth_date)}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                  >
                    {child.talentos}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex items-center pb-2 pt-6">
            <ArrowPathIcon className="h-5 w-5 text-black" />
            <h3 className="ml-2 text-sm text-black ">Updated just now</h3>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <TopFiveChildrenSkeleton />
    );
  }
}
