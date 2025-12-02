'use client';

import { Navbar } from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/layout/Footer";
import { Button } from "@/src/components/ui/button";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PaymentSuccessPage() {
    // Simulamos una pequeña carga para dar sensación de procesamiento
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsProcessing(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 text-center">
                        {isProcessing ? (
                            <div className="py-12">
                                <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-6" />
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Verificando pago...</h2>
                                <p className="text-gray-500">Estamos confirmando la transacción con Mercado Pago.</p>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-3">¡Pago Exitoso!</h1>
                                <p className="text-gray-600 mb-8">
                                    Tu aplicación ha sido activada correctamente. Ya puedes generar tus credenciales de API y comenzar a integrar.
                                </p>

                                <div className="space-y-3">
                                    <Link href="/dashboard" className="block w-full">
                                        <Button className="w-full h-12 text-base bg-black hover:bg-gray-800">
                                            Ir al Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <p className="text-xs text-gray-400 mt-4">
                                        Hemos enviado el recibo a tu correo electrónico.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Decoración inferior */}
                    <div className="h-2 bg-gradient-to-r from-primary via-secondary to-primary" />
                </div>
            </main>

            <Footer />
        </div>
    );
}