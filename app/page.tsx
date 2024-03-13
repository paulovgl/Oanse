import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Logo from '@/public/logo-oanse';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gradient-to-r from-blue-500 via-red-500 to-green-500 p-6 md:h-52">
      <Logo width={412} height={160} />
      <Link
        href="/login"
        className={`${lusitana.className} flex items-center gap-5 rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white md:text-base`}
      >
        <span>Entrar</span> <ArrowRightIcon className="w-5 md:w-6" />
      </Link>
    </main>
  );
}
