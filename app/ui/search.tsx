'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder, currentUserClub }: { placeholder: string, currentUserClub: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300)

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className={clsx("block w-full bg-transparent rounded-md border py-[9px] pl-10 text-sm text-white outline-2 placeholder:text-white", {
          'border-red-600': currentUserClub === 'ursinhos',
          'border-yellow-600': currentUserClub === 'faisca',
          'border-green-600': currentUserClub === 'flama',
          'border-blue-600': currentUserClub === 'tocha',
          'border-gray-200': currentUserClub === 'jv',
          'border-gray-600': currentUserClub === 'vq7',
        })}
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-white" />
    </div>
  );
}
