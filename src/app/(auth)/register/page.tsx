import { Navbar } from '@/src/components/layout/Navbar';
import { Footer } from '@/src/components/layout/Footer';
import { RegisterForm } from '@/src/features/auth/components/RegisterForm';

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col justify-between">
            <Navbar />

            <main className="flex-1 py-20 px-6">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                            Crear una cuenta
                        </h1>
                        <p className="mt-2 text-lg text-slate-500">
                            Únete a la revolución de la educación emocional.
                        </p>
                    </div>

                    <RegisterForm />
                </div>
            </main>

            <Footer />
        </div>
    );
}