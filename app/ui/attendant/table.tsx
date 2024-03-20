import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice, PushAttendant } from '@/app/ui/attendant/buttons';
import InvoiceStatus from '@/app/ui/attendant/status';
import { formatDateToLocal, formatCurrency, generateSaturdays, formatPhoneNumber } from '@/app/lib/utils';
import { fetchFilteredChildren } from '@/app/lib/data';
import clsx from 'clsx';

export default async function AttendantTable({
  query,
  currentPage,
  currentUserClub
}: {
  query: string;
  currentPage: number;
  currentUserClub: string;
}) {
  const children = await fetchFilteredChildren(query, currentPage, currentUserClub);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className={clsx("rounded-lg p-2 md:pt-0", {
          'bg-red-600': currentUserClub === 'ursinhos',
          'bg-yellow-600': currentUserClub === 'faisca',
          'bg-green-600': currentUserClub === 'flama',
          'bg-blue-600': currentUserClub === 'tocha',
          'bg-gray-300': currentUserClub === 'jv',
          'bg-gray-600': currentUserClub === 'vq7',
        })}>
          <div className="md:hidden">
            {children?.map((child) => (
              <div
                key={child.id}
                className={clsx("mb-2 w-full rounded-md p-4", {
                  'bg-red-600': currentUserClub === 'ursinhos',
                  'bg-yellow-600': currentUserClub === 'faisca',
                  'bg-green-600': currentUserClub === 'flama',
                  'bg-blue-600': currentUserClub === 'tocha',
                  'bg-gray-200': currentUserClub === 'jv',
                  'bg-gray-600': currentUserClub === 'vq7',
                })}
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={"/customers/emil-kowalski.png"}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${child.name}'s profile picture`}
                      />
                      <p>{child.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{formatDateToLocal(child.birth_date)}</p>
                  </div>
                  <InvoiceStatus status={child.attendant} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {child.affiliation}
                    </p>
                    <p>{child.fone}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    {/* <UpdateInvoice id={child.id} /> */}
                    <PushAttendant id={child.id} action='attendant' />
                    <PushAttendant id={child.id} action='pending' />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Criança
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Contato
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Filiação
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Nascimento
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Frequência
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className={clsx("", {
              'bg-red-600': currentUserClub === 'ursinhos',
              'bg-yellow-600': currentUserClub === 'faisca',
              'bg-green-600': currentUserClub === 'flama',
              'bg-blue-600': currentUserClub === 'tocha',
              'bg-gray-200': currentUserClub === 'jv',
              'bg-gray-600': currentUserClub === 'vq7',
            })}>
              {children?.map((child) => (
                <tr
                  key={child.id}
                  className="w-full border-b border-black py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={"/customers/emil-kowalski.png"}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${child.name}'s profile picture`}
                      />
                      <p>{child.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatPhoneNumber(child.fone)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {child.affiliation}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(child.birth_date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={child.attendant} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      {/* <UpdateInvoice id={child.id} /> */}
                      <PushAttendant id={child.id} action='attendant' />
                      <PushAttendant id={child.id} action='pending' />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
