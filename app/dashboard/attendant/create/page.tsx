import Form from '@/app/ui/attendant/create-form';
import Breadcrumbs from '@/app/ui/attendant/breadcrumbs';
import { getUserData } from '@/app/lib/data';

export default async function Page() {
    const currentUserClub = (await getUserData()).club

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Frequência', href: '/dashboard/attendant' },
                    {
                        label: 'Adicionar Criança',
                        href: '/dashboard/attendant/create',
                        active: true,
                    },
                ]}
            />
            <Form currentUserClub={currentUserClub} />
        </main>
    );
}