import Form from '@/app/ui/attendant/create-form';
import Breadcrumbs from '@/app/ui/attendant/breadcrumbs';
// import { fetchCustomers } from '@/app/lib/data';

export default async function Page() {
    // const customers = await fetchCustomers();

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
            <Form />
        </main>
    );
}