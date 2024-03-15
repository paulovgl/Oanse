import CardWrapper from '@/app/ui/dashboard/cards';
import TopFiveChildren from '@/app/ui/dashboard/top-five-children';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { TopFiveChildrenSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import { getUserData } from '@/app/lib/data';


export default async function Page() {
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Início
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper club={(await getUserData()).club} />
                </Suspense>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<TopFiveChildrenSkeleton />}>
                    <TopFiveChildren club={(await getUserData()).club} />
                </Suspense>
                <Suspense fallback={<TopFiveChildrenSkeleton />}>
                    <TopFiveChildren club={(await getUserData()).club} />
                </Suspense>
            </div>
        </main>
    );
}