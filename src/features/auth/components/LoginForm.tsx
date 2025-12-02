'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { authService } from '../services/auth.service';
import { EmailStep } from './steps/EmailStep';
import { VerificationCodeStep } from './steps/VerificationCodeStep';
import { useToast } from "@/src/hooks/use-toast";
import { Edit2 } from "lucide-react";

export const LoginForm = () => {
    const router = useRouter();
    const { toast } = useToast();

    // Estado visual: 'idle' (pidiendo email) o 'otp_sent' (pidiendo código)
    const [status, setStatus] = useState<'idle' | 'otp_sent'>('idle');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        defaultValues: { email: '', code: '' }
    });

    const onEmailSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            await authService.requestLogin(data.email);
            setEmail(data.email);
            setStatus('otp_sent');
            toast({ title: "Código enviado", description: "Revisa tu bandeja de entrada." });
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.response?.data?.detail || "No pudimos enviar el código. Verifica que el correo exista."
            });
        } finally {
            setIsLoading(false);
        }
    };

    const onCodeSubmit = async (code: string) => {
        setIsLoading(true);
        try {
            await authService.verifyLogin(email, code);
            router.push('/dashboard');
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Código inválido o expirado."
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditEmail = () => {
        setStatus('idle');
        form.setValue('code', ''); // Limpiar código si regresa
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 overflow-hidden relative">

                {/* Barra decorativa superior */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />

                <div className="flex flex-col gap-8">

                    {/* PASO 1: EMAIL */}
                    <div className={`transition-all duration-500 ease-in-out ${
                        status === 'otp_sent' ? 'opacity-40 pointer-events-none grayscale' : 'opacity-100'
                    }`}>
                        <div className="flex justify-between items-center mb-2">
                            {/* Si ya enviamos el código, mostramos un indicador visual o botón de editar */}
                            {status === 'otp_sent' && (
                                <button
                                    onClick={handleEditEmail}
                                    className="pointer-events-auto flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors mb-2"
                                >
                                    <Edit2 className="h-3 w-3" /> Corregir correo
                                </button>
                            )}
                        </div>

                        <EmailStep
                            form={form}
                            onSubmit={onEmailSubmit}
                            isLoading={isLoading && status === 'idle'}
                        />
                    </div>

                    {/* PASO 2: CÓDIGO (Aparece abajo) */}
                    {status === 'otp_sent' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
                            {/* Línea conectora visual */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-px h-6 bg-slate-200" />

                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                <VerificationCodeStep
                                    email={email}
                                    onVerify={onCodeSubmit}
                                    onResend={() => onEmailSubmit({ email })}
                                    isLoading={isLoading}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};