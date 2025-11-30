'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";

// Importamos los pasos
import { EmailStep } from "./steps/EmailStep";
import { OTPStep } from "./steps/OTPStep";

const emailSchema = z.object({
    email: z.string().email("Ingresa un correo electrónico válido"),
});

const otpSchema = z.object({
    otp: z.string().length(6, "El código debe tener 6 dígitos exactos"),
});

export const LoginForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [savedEmail, setSavedEmail] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const emailForm = useForm<z.infer<typeof emailSchema>>({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: "" },
    });

    const otpForm = useForm<z.infer<typeof otpSchema>>({
        resolver: zodResolver(otpSchema),
        defaultValues: { otp: "" },
    });

    // Handler Paso 1
    const handleEmailSubmit = async (values: z.infer<typeof emailSchema>) => {
        setIsLoading(true);
        setError("");
        try {
            await authService.requestLogin(values.email);
            setSavedEmail(values.email);
            setCurrentStep(2);
            // Foco automático al input del OTP
            setTimeout(() => document.getElementById('otp-input')?.focus(), 100);
        } catch (err: unknown) {
            setError("No pudimos encontrar ese correo.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handler Paso 2
    const handleOtpSubmit = async (values: z.infer<typeof otpSchema>) => {
        setIsLoading(true);
        setError("");
        try {
            await authService.verifyLogin(savedEmail, values.otp);
            router.push("/dashboard");
        } catch (err: unknown) {
            setError("Código incorrecto o expirado.");
        } finally {
            setIsLoading(false);
        }
    };

    // Regresar al paso 1
    const handleEditEmail = () => {
        setCurrentStep(1);
        setError("");
        otpForm.reset();
    };

    return (
        <div className="w-full max-w-md mx-auto space-y-4">
            {/* Paso 1 */}
            <EmailStep
                form={emailForm}
                onSubmit={handleEmailSubmit}
                isLoading={isLoading}
                isActive={currentStep === 1}
                isCompleted={currentStep > 1}
                onEdit={handleEditEmail}
                error={currentStep === 1 ? error : undefined}
            />

            {/* Paso 2 (Solo se renderiza si ya pasamos el 1) */}
            {currentStep >= 2 && (
                <OTPStep
                    form={otpForm}
                    onSubmit={handleOtpSubmit}
                    isLoading={isLoading}
                    isActive={currentStep === 2}
                    emailSentTo={savedEmail}
                    error={currentStep === 2 ? error : undefined}
                />
            )}
        </div>
    );
};