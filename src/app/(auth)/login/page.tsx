import { Navbar } from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/layout/Footer";
import { LoginForm } from "@/src/features/auth/components/LoginForm";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />

            <main className="flex-1 flex items-center justify-center relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-[100px] -z-10 pointer-events-none" />

                <div className="w-full max-w-md space-y-8">
                    <LoginForm />
                </div>
            </main>

            <Footer />
        </div>
    );
}