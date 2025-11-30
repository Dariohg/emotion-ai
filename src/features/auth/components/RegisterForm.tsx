// src/features/auth/components/RegisterForm.tsx
'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";

// Importamos los pasos
import { NameEmailStep } from "./steps/NameEmailStep";
import { VerificationCodeStep } from "./steps/VerificationCodeStep";
import { OTPStep } from "./steps/OTPStep"; // Reutilizamos el de Login

// Esquemas de validación
const nameEmailSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Ingresa un correo electrónico válido"),
});

const codeSchema = z.object({
    code: z.string().length(6, "El código debe tener 6 dígitos exactos"),
});

const otpSchema = z.object({
    otp: z.string().length(6, "El código debe tener 6 dígitos exactos"),
});

export const RegisterForm = () => {
    // 1: Datos, 2: Código Registro, 3: Código Login (Automático)
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Datos temporales
    const [savedData, setSavedData] = useState({ name: "", email: "" });
    const [error, setError] = useState("");

    const router = useRouter();

    // Formularios independientes para cada paso
    const dataForm = useForm<z.infer<typeof nameEmailSchema>>({
        resolver: zodResolver(nameEmailSchema),
        defaultValues: { name: "", email: "" },
    });

    const regCodeForm = useForm<z.infer<typeof codeSchema>>({
        resolver: zodResolver(codeSchema),
        defaultValues: { code: "" },
    });

    const otpForm = useForm<z.infer<typeof otpSchema>>({
        resolver: zodResolver(otpSchema),
        defaultValues: { otp: "" },
    });

    // --- Paso 1: Solicitar Registro (Postman Step 2) ---
    const handleDataSubmit = async (values: z.infer<typeof nameEmailSchema>) => {
        setIsLoading(true);
        setError("");
        try {
            await authService.requestVerification(values.name, values.email);
            setSavedData(values);
            setCurrentStep(2);
            setTimeout(() => document.getElementById('register-code-input')?.focus(), 100);
        } catch (err: any) {
            if (err.response?.status === 400) {
                setError("Este correo ya está registrado o es inválido.");
            } else {
                setError("Ocurrió un error al solicitar el registro.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // --- Paso 2: Confirmar Registro y Auto-Login (Postman Step 3 & 4) ---
    const handleRegCodeSubmit = async (values: z.infer<typeof codeSchema>) => {
        setIsLoading(true);
        setError("");
        try {
            // 1. Confirmar Registro (Step 3)
            await authService.confirmRegistration(savedData.name, savedData.email, values.code);

            // 2. Automáticamente solicitar OTP de Login (Step 4)
            // Ya que el registro no devuelve token, iniciamos el flujo de login inmediatamente
            await authService.requestLogin(savedData.email);

            setCurrentStep(3);
            setTimeout(() => document.getElementById('otp-input')?.focus(), 100);
        } catch (err: any) {
            setError("Código de registro incorrecto o expirado.");
        } finally {
            setIsLoading(false);
        }
    };

    // --- Paso 3: Verificar Login Final (Postman Step 5) ---
    const handleOtpSubmit = async (values: z.infer<typeof otpSchema>) => {
        setIsLoading(true);
        setError("");
        try {
            await authService.verifyLogin(savedData.email, values.otp);
            router.push("/dashboard");
        } catch (err: any) {
            setError("Código de acceso incorrecto.");
        } finally {
            setIsLoading(false);
        }
    };

    // Permitir editar datos si se equivocó en el paso 1
    const handleEditData = () => {
        setCurrentStep(1);
        setError("");
        regCodeForm.reset();
        otpForm.reset();
    };

    return (
        <div className="w-full max-w-md mx-auto space-y-4">
            {/* Paso 1: Nombre y Email */}
            <NameEmailStep
                form={dataForm}
                onSubmit={handleDataSubmit}
                isLoading={isLoading}
                isActive={currentStep === 1}
                isCompleted={currentStep > 1}
                onEdit={handleEditData}
                error={currentStep === 1 ? error : undefined}
            />

            {/* Paso 2: Código de Verificación de Registro */}
            {currentStep >= 2 && (
                <VerificationCodeStep
                    form={regCodeForm}
                    onSubmit={handleRegCodeSubmit}
                    isLoading={isLoading}
                    isActive={currentStep === 2}
                    isCompleted={currentStep > 2}
                    error={currentStep === 2 ? error : undefined}
                />
            )}

            {/* Paso 3: Código de Acceso (OTP Login) */}
            {currentStep >= 3 && (
                <OTPStep
                    form={otpForm}
                    onSubmit={handleOtpSubmit}
                    isLoading={isLoading}
                    isActive={currentStep === 3}
                    emailSentTo={savedData.email}
                    error={currentStep === 3 ? error : undefined}
                />
            )}
        </div>
    );
};