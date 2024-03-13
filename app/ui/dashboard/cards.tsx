import {
  BoltIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  moreSections: ClipboardDocumentCheckIcon,
  moreAttendance: BoltIcon,
  children: UserGroupIcon,
  sections: ClipboardDocumentListIcon,
};

export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
  return (
    <>
      <Card title="Top 1 Seção" value={totalPaidInvoices} type="moreSections" />
      <Card title="Top 1 Presença" value={totalPendingInvoices} type="moreAttendance" />
      <Card title="Total Crianças" value={numberOfInvoices} type="children" />
      <Card
        title="Total Seções"
        value={numberOfCustomers}
        type="sections"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'children' | 'sections' | 'moreAttendance' | 'moreSections';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
