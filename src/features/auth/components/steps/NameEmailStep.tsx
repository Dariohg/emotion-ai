import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/src/lib/schemas";
import { z } from "zod";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { StepLayout } from "./StepLayout";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";

type RegisterFormValues = z.infer<typeof registerSchema>;

interface NameEmailStepProps {
    onSubmit: (name: string, email: string) => void;
    isLoading: boolean;
    initialValues: { name: string; email: string };
    isActive: boolean;
    isCompleted: boolean;
}

export const NameEmailStep = ({ onSubmit, isLoading, initialValues, isActive, isCompleted }: NameEmailStepProps) => {
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: initialValues
    });

    useEffect(() => {
        if (initialValues.name) form.setValue('name', initialValues.name);
        if (initialValues.email) form.setValue('email', initialValues.email);
    }, [initialValues, form]);

    const handleSubmit = (data: RegisterFormValues) => {
        onSubmit(data.name, data.email);
    };

    return (
        <StepLayout
            title="Crea tu cuenta"
            subtitle="Comienza gratis por 30 días. No se requiere tarjeta."
            isActive={isActive}
            isCompleted={isCompleted}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">

                    {/* CAMPO NOMBRE */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre de la Organización / Persona</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ej. Universidad Politécnica"
                                        className="h-11 bg-slate-50"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* CAMPO EMAIL */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Correo Electrónico</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="nombre@institucion.edu"
                                        className="h-11 bg-slate-50"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white mt-6"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Continuar"}
                    </Button>
                </form>
            </Form>
        </StepLayout>
    );
};