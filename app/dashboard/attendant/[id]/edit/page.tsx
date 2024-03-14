import Form from '@/app/ui/attendant/edit-form';
import Breadcrumbs from '@/app/ui/attendant/breadcrumbs';
import { fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';


export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const invoice = await fetchInvoiceById(id)

    if (!invoice) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Presença', href: '/dashboard/attendant' },
                    {
                        label: 'Editar Criança',
                        href: `/dashboard/attendant/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form invoice={invoice} />
        </main>
    );
}