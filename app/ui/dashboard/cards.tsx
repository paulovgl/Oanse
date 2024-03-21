import {
  BoltIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import clsx from 'clsx';

const iconMap = {
  moreSections: ClipboardDocumentCheckIcon,
  moreAttendance: BoltIcon,
  children: UserGroupIcon,
  sections: ClipboardDocumentListIcon,
};

export default async function CardWrapper({ club }: { club: string }) {
  const {
    numberOfChildren,
    numberOfTalentos,
    topSectionsChildren,
    topAttendantChildren,
  } = await fetchCardData(club);
  return (
    <>
      <Card
        currentUserClub={club}
        title="Top 1 Seção"
        value={topSectionsChildren}
        type="moreSections"
      />
      <Card
        currentUserClub={club}
        title="Top 1 Presença"
        value={topAttendantChildren}
        type="moreAttendance"
      />
      <Card
        currentUserClub={club}
        title="Total Oansistas"
        value={numberOfChildren}
        type="children"
      />
      <Card
        currentUserClub={club}
        title="Total Seções"
        value={numberOfTalentos}
        type="sections"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
  currentUserClub,
}: {
  title: string;
  value: number | string;
  type: 'children' | 'sections' | 'moreAttendance' | 'moreSections';
  currentUserClub: string;
}) {
  const Icon = iconMap[type];

  return (
    <div className={clsx("rounded-xl p-2 shadow-sm", {
      'bg-red-300': currentUserClub === 'ursinhos',
      'bg-yellow-600': currentUserClub === 'faisca',
      'bg-green-600': currentUserClub === 'flama',
      'bg-blue-600': currentUserClub === 'tocha',
      'bg-gray-300': currentUserClub === 'jv',
      'bg-gray-600': currentUserClub === 'vq7',
    })}>
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={clsx(`${lusitana.className}
          truncate rounded-xl px-4 py-8 text-center text-2xl`, {
          'bg-red-200': currentUserClub === 'ursinhos',
          'bg-yellow-600': currentUserClub === 'faisca',
          'bg-green-600': currentUserClub === 'flama',
          'bg-blue-600': currentUserClub === 'tocha',
          'bg-gray-200': currentUserClub === 'jv',
          'bg-gray-600': currentUserClub === 'vq7',
        })}
      >
        {value}
      </p>
    </div>
  );
}
