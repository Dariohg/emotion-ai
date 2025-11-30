'use client';

import { UseFormReturn } from "react-hook-form";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/src/components/ui/form";
import { StepLayout } from "./StepLayout";

interface OTPStepProps {
    form: UseFormReturn<any>;
    onSubmit: (values: any) => Promise<void>;
    isLoading: boolean;
    isActive: boolean;
    emailSentTo: string;
    error?: string;
}

export const OTPStep = ({ form, onSubmit, isLoading, isActive, emailSentTo, error }: OTPStepProps) => {
    return (
        <StepLayout
            title="2. Verificación"
            description={
                <span>
          Código enviado a <span className="font-semibold text-black bg-gray-100 px-1 rounded">{emailSentTo}</span>
        </span>
            }
            isActive={isActive}
            isCompleted={false} // Último paso
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-2">
                    <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            id="otp-input"
                                            placeholder="0 0 0 0 0 0"
                                            className="text-center text-4xl tracking-[0.4em] font-bold h-20 w-full bg-transparent border-b-2 border-gray-200 border-t-0 border-x-0 rounded-none focus:ring-0 focus:border-black px-0 transition-all placeholder:text-gray-200 text-gray-900"
                                            maxLength={6}
                                            autoComplete="one-time-code"
                                            autoFocus
                                            disabled={!isActive}
                                            {...field}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="text-center text-red-500 font-medium" />
                            </FormItem>
                        )}
                    />

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.01]"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Verificar y Entrar"}
                        {!isLoading && <CheckCircle2 className="ml-2 h-5 w-5" />}
                    </Button>
                </form>
            </Form>
        </StepLayout>
    );
};