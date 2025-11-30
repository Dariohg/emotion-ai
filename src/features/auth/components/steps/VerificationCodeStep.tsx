// src/features/auth/components/steps/VerificationCodeStep.tsx
'use client';

import { UseFormReturn } from "react-hook-form";
import { Loader2, Check } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/src/components/ui/form";
import { StepLayout } from "./StepLayout";

interface VerificationCodeStepProps {
    form: UseFormReturn<any>;
    onSubmit: (values: any) => Promise<void>;
    isLoading: boolean;
    isActive: boolean;
    isCompleted: boolean;
    error?: string;
}

export const VerificationCodeStep = ({ form, onSubmit, isLoading, isActive, isCompleted, error }: VerificationCodeStepProps) => {
    return (
        <StepLayout
            title="2. Confirmar Registro"
            description="Ingresa el código que enviamos a tu correo para crear la cuenta."
            isActive={isActive}
            isCompleted={isCompleted}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-2">
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            id="register-code-input"
                                            placeholder="0 0 0 0 0 0"
                                            className="text-center text-4xl tracking-[0.4em] font-bold h-20 w-full bg-transparent border-b-2 border-gray-200 border-t-0 border-x-0 rounded-none focus:ring-0 focus:border-black px-0 transition-all placeholder:text-gray-200 text-gray-900"
                                            maxLength={6}
                                            autoComplete="one-time-code"
                                            disabled={!isActive}
                                            {...field}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="text-center text-red-500" />
                            </FormItem>
                        )}
                    />

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium">
                            {error}
                        </div>
                    )}

                    {isActive && (
                        <Button
                            type="submit"
                            className="w-full h-14 text-lg bg-black hover:bg-gray-800 text-white rounded-xl"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Confirmar Cuenta"}
                            {!isLoading && <Check className="ml-2 h-5 w-5" />}
                        </Button>
                    )}
                </form>
            </Form>
        </StepLayout>
    );
};