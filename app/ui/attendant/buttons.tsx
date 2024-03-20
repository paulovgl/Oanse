import { CheckIcon, PencilIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteChild, updateAttendant } from '@/app/lib/actions';
import clsx from 'clsx';


export function CreateChild({ currentUserClub }: { currentUserClub: string }) {

  return (
    <Link
      href="/dashboard/attendant/create"
      className={clsx("flex h-10 items-center rounded-lg px-4 text-sm font-medium text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2", {
        'bg-red-600': currentUserClub === 'ursinhos',
        'bg-yellow-600': currentUserClub === 'faisca',
        'bg-green-600': currentUserClub === 'flama',
        'bg-blue-600': currentUserClub === 'tocha',
        'bg-gray-300 hover:bg-gray-200 focus-visible:outline-gray-300': currentUserClub === 'jv',
        'bg-gray-600': currentUserClub === 'vq7',
      })}
    >
      <span className="hidden text-black md:block">Adicionar Criança</span>{' '}
      <PlusIcon className="h-5 text-black md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/attendant/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteChild.bind(null, id);
  return (
    <form action={deleteInvoiceWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function PushAttendant({ id, action }: { id: string, action: "pending" | "attendant" }) {
  const updateChildAttendant = updateAttendant.bind(null, id, action);
  return (
    <form action={updateChildAttendant}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        {action === "pending" && (
          <>
            <span className="sr-only">Falta</span>
            <XMarkIcon className="w-5" />
          </>
        )}
        {action === "attendant" && (
          <>
            <span className="sr-only">Presente</span>
            <CheckIcon className="w-5" />
          </>
        )}

      </button>
    </form>
  );
}

