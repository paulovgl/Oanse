import Logo from '@/public/logo-oanse';
import LoginForm from '@/app/ui/login-form';

export default function LoginPage() {
    return (
        <main className="flex h-screen items-center justify-center bg-black">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex h-36 w-full items-center justify-center border-white border-solid border-2 bg-gradient-to-r from-blue-500 via-red-500 to-green-500 rounded-lg p-3 md:h-36">
                    <Logo width={257} height={128} />
                </div>
                <LoginForm />
            </div>
        </main>
    );
}