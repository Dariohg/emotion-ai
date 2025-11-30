'use client';

import { UseFormReturn } from "react-hook-form";
import { Mail, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/src/components/ui/form";
import { StepLayout } from "./StepLayout";

interface EmailStepProps {
    form: UseFormReturn<any>;
    onSubmit: (values: any) => Promise<void>;
    isLoading: boolean;
    isActive: boolean;
    isCompleted: boolean;
    onEdit: () => void;
    error?: string;
}

export const EmailStep = ({ form, onSubmit, isLoading, isActive, isCompleted, onEdit, error }: EmailStepProps) => {
    return (
        <StepLayout
            title="1. Tu Correo"
            description="Ingresa tu correo institucional para iniciar."
            isActive={isActive}
            isCompleted={isCompleted}
            onEdit={onEdit}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative group">
                                        {/* ICONO: Centrado verticalmente */}
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                            <Mail className={`h-5 w-5 transition-colors ${isActive ? 'text-gray-900' : 'text-gray-400'}`} />
                                        </div>

                                        {/* INPUT: pl-12 da espacio suficiente para que el texto no toque el icono */}
                                        <Input
                                            placeholder="nombre@upchiapas.edu.mx"
                                            className={`pl-12 h-14 text-lg transition-all rounded-xl
                        ${isActive
                                                ? 'bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black'
                                                : 'bg-transparent border-transparent px-0 pl-12 font-medium text-gray-600' // Estilo "solo texto" al completar
                                            }`}
                                            disabled={!isActive}
                                            autoComplete="email"
                                            {...field}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="text-sm text-red-500 font-medium pl-2" />
                            </FormItem>
                        )}
                    />

                    {error && <p className="text-sm text-red-500 font-medium pl-2">{error}</p>}

                    {isActive && (
                        <Button
                            type="submit"
                            className="w-full h-14 text-lg bg-black hover:bg-gray-800 text-white rounded-xl mt-2 transition-transform active:scale-[0.99]"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Continuar"}
                            {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
                        </Button>
                    )}
                </form>
            </Form>
        </StepLayout>
    );
};