'use client';

import { UseFormReturn } from "react-hook-form";
import { Mail, User, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/src/components/ui/form";
import { StepLayout } from "./StepLayout";

interface NameEmailStepProps {
    form: UseFormReturn<any>;
    onSubmit: (values: any) => Promise<void>;
    isLoading: boolean;
    isActive: boolean;
    isCompleted: boolean;
    onEdit: () => void;
    error?: string;
}

export const NameEmailStep = ({ form, onSubmit, isLoading, isActive, isCompleted, onEdit, error }: NameEmailStepProps) => {
    return (
        <StepLayout
            title="1. Datos de la Empresa"
            description="Comencemos con los datos básicos."
            isActive={isActive}
            isCompleted={isCompleted}
            onEdit={onEdit}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Campo Nombre */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                            <User className={`h-5 w-5 transition-colors ${isActive ? 'text-gray-900' : 'text-gray-400'}`} />
                                        </div>
                                        <Input
                                            placeholder="Nombre de tu Empresa"
                                            className={`pl-12 h-14 text-lg transition-all rounded-xl ${isActive ? 'bg-gray-50' : 'bg-transparent border-transparent px-0 pl-12 text-gray-600'}`}
                                            disabled={!isActive}
                                            {...field}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="pl-2" />
                            </FormItem>
                        )}
                    />

                    {/* Campo Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                            <Mail className={`h-5 w-5 transition-colors ${isActive ? 'text-gray-900' : 'text-gray-400'}`} />
                                        </div>
                                        <Input
                                            placeholder="correo@empresa.com"
                                            className={`pl-12 h-14 text-lg transition-all rounded-xl ${isActive ? 'bg-gray-50' : 'bg-transparent border-transparent px-0 pl-12 text-gray-600'}`}
                                            disabled={!isActive}
                                            {...field}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="pl-2" />
                            </FormItem>
                        )}
                    />

                    {error && <p className="text-sm text-red-500 font-medium pl-2">{error}</p>}

                    {isActive && (
                        <Button
                            type="submit"
                            className="w-full h-14 text-lg bg-black hover:bg-gray-800 text-white rounded-xl mt-2"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Solicitar Código"}
                            {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
                        </Button>
                    )}
                </form>
            </Form>
        </StepLayout>
    );
};