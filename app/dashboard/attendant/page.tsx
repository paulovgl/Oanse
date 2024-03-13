import Pagination from '@/app/ui/attendant/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/attendant/table';
import { CreateChild } from '@/app/ui/attendant/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchAttendatPages } from '@/app/lib/data';
import { Metadata } from 'next';
import { formatDateToLocal, generateSaturdays } from '@/app/lib/utils';
import { getUserData } from '@/auth';

export const metadata: Metadata = {
    title: 'Frequência',
};

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const currentUserClub = (await getUserData()).club

    const totalPages = await fetchAttendatPages(query, currentUserClub);

    // if (generateSaturdays().includes(formatDateToLocal(new Date().toDateString()))) {
    if (true) {
        return (
            <div className="w-full">
                <div className="flex w-full items-center justify-between">
                    <h1 className={`${lusitana.className} text-2xl`}>Frequência</h1>
                </div>
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <Search placeholder="Pesquisar crianças..." />
                    <CreateChild />
                </div>
                <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                    <Table query={query} currentPage={currentPage} currentUserClub={currentUserClub} />
                </Suspense>
                <div className="mt-5 flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div>
            </div>)
    } else {
        return (
            <div className="flex h-full flex-col items-center justify-center">
                <h2 className="text-center">A seção de <strong>Presença</strong> é liberada somente aos Sábados.</h2>
                <h2 className="text-center">Para dar presenças anteriores navegue até <strong>Oansistas</strong>.</h2>
            </div>)
    }




}