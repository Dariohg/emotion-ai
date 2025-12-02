import { LoginForm } from '@/src/features/auth/components/LoginForm';
import { Navbar } from '@/src/components/layout/Navbar';
import { Footer } from '@/src/components/layout/Footer';

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
            <Navbar />

            <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
                {/* Fondo decorativo */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-3xl" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-violet-100/50 rounded-full blur-3xl" />
                </div>

                <div className="z-10 w-full max-w-md space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            Acceder a tu cuenta
                        </h1>
                        <p className="text-slate-500">
                            Ingresa tu correo institucional para continuar
                        </p>
                    </div>

                    <LoginForm />

                    <p className="text-center text-sm text-slate-500">
                        ¿No tienes cuenta?{' '}
                        <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                            Regístrate aquí
                        </a>
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}