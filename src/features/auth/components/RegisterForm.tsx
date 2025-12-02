'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { NameEmailStep } from './steps/NameEmailStep';
import { VerificationCodeStep } from './steps/VerificationCodeStep';
import { authService } from '../services/auth.service';
import { useToast } from "@/src/hooks/use-toast";
import { CheckCircle2 } from 'lucide-react';

export const RegisterForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { toast } = useToast();

    // Estado para controlar qué paso está activo
    const [isStep1Completed, setIsStep1Completed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        code: ''
    });

    // Cargar datos de URL
    useEffect(() => {
        if (!searchParams) return;
        const nameParam = searchParams.get('name');
        const emailParam = searchParams.get('email');

        if (nameParam || emailParam) {
            setFormData(prev => ({
                ...prev,
                name: nameParam || prev.name,
                email: emailParam || prev.email
            }));
        }
    }, [searchParams]);

    // Manejadores
    const handleSendCode = async (name: string, email: string) => {
        setIsLoading(true);
        setFormData(prev => ({ ...prev, name, email }));
        try {
            await authService.requestEmailVerification(name, email);
            setIsStep1Completed(true); // Marcamos paso 1 como completado (se opacará)
            toast({ title: "Código enviado", description: `Revisa ${email}` });
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: "No se pudo enviar el código." });
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyCode = async (code: string) => {
        setIsLoading(true);
        try {
            await authService.registerCompany(formData.name, formData.email, code);
            toast({ title: "¡Cuenta creada!", description: "Redirigiendo..." });
            router.push('/login');
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: "Código incorrecto." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-12 relative">
            {/* Línea vertical conectora (opcional, para dar idea de flujo) */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-100 -z-10 hidden md:block" />

            {/* PASO 1: DATOS */}
            <div className={`transition-all duration-500 ease-in-out ${
                isStep1Completed ? 'opacity-50 pointer-events-none grayscale-[0.5]' : 'opacity-100'
            }`}>
                <div className="flex items-start gap-6">
                    {/* Indicador de paso */}
                    <div className={`hidden md:flex h-12 w-12 rounded-full items-center justify-center shrink-0 border-2 transition-colors ${
                        isStep1Completed
                            ? 'bg-green-50 border-green-500 text-green-600'
                            : 'bg-white border-indigo-600 text-indigo-600'
                    }`}>
                        {isStep1Completed ? <CheckCircle2 className="h-6 w-6" /> : <span className="text-lg font-bold">1</span>}
                    </div>

                    {/* Contenido del paso */}
                    <div className="flex-1">
                        <NameEmailStep
                            onSubmit={handleSendCode}
                            isLoading={isLoading}
                            initialValues={{ name: formData.name, email: formData.email }}
                            isActive={!isStep1Completed}
                            isCompleted={isStep1Completed}
                        />
                    </div>
                </div>
            </div>

            {/* PASO 2: CÓDIGO (Solo aparece si el 1 está completo) */}
            {isStep1Completed && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex items-start gap-6">
                        {/* Indicador de paso */}
                        <div className="hidden md:flex h-12 w-12 rounded-full bg-indigo-600 text-white items-center justify-center shrink-0 shadow-lg shadow-indigo-500/30">
                            <span className="text-lg font-bold">2</span>
                        </div>

                        <div className="flex-1">
                            <VerificationCodeStep
                                email={formData.email}
                                onVerify={handleVerifyCode}
                                onResend={() => handleSendCode(formData.name, formData.email)}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};