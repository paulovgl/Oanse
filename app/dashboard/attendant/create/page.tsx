import Form from '@/app/ui/attendant/create-form';
import Breadcrumbs from '@/app/ui/attendant/breadcrumbs';

export default async function Page() {
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