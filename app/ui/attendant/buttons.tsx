import { CheckIcon, PencilIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteChild, updateAttendant } from '@/app/lib/actions';


export function CreateChild() {
  return (
    <Link
      href="/dashboard/attendant/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Adicionar Criança</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
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

