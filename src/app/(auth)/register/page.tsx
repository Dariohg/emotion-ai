// src/app/(auth)/register/page.tsx
import { Navbar } from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/layout/Footer";
import { RegisterForm } from "@/src/features/auth/components/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />

            <main className="flex-1 flex items-center justify-center relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
                {/* Fondo decorativo */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-secondary/5 to-transparent rounded-full blur-[100px] -z-10 pointer-events-none" />

                <div className="w-full max-w-md space-y-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Crear Cuenta</h1>
                        <p className="mt-2 text-gray-600">Registra tu empresa para obtener acceso a la API.</p>
                    </div>

                    <RegisterForm />

                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-500">
                            ¿Ya tienes cuenta?{" "}
                            <Link href="/login" className="font-medium text-primary hover:underline">
                                Iniciar sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}