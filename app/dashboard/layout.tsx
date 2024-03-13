import SideNav from '@/app/ui/dashboard/sidenav';
import { getUserData } from '@/auth';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const currentUserData = await getUserData()

    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav club={currentUserData} />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    );
}