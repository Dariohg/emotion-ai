import { useForm } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { StepLayout } from "./StepLayout";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

interface NameEmailStepProps {
    onSubmit: (name: string, email: string) => void;
    isLoading: boolean;
    initialValues: { name: string; email: string };
    isActive: boolean;
    isCompleted: boolean;
}

export const NameEmailStep = ({ onSubmit, isLoading, initialValues, isActive, isCompleted }: NameEmailStepProps) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: initialValues
    });

    // Actualizar el formulario si los valores iniciales cambian (ej. carga desde URL)
    useEffect(() => {
        if (initialValues.name) setValue('name', initialValues.name);
        if (initialValues.email) setValue('email', initialValues.email);
    }, [initialValues, setValue]);

    return (
        <StepLayout
            title="Crea tu cuenta"
            subtitle="Comienza gratis por 30 días. No se requiere tarjeta."
            isActive={isActive}
            isCompleted={isCompleted}
        >
            <form onSubmit={handleSubmit((data) => onSubmit(data.name, data.email))} className="space-y-5">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                            Nombre de la Organización / Persona
                        </label>
                        <Input
                            id="name"
                            placeholder="Ej. Universidad Politécnica"
                            {...register("name", { required: "El nombre es obligatorio" })}
                            className="h-11 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50"
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                            Correo Electrónico
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="nombre@institucion.edu"
                            {...register("email", {
                                required: "El email es obligatorio",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Email inválido"
                                }
                            })}
                            className="h-11 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-base shadow-lg shadow-indigo-500/20 transition-all mt-6"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Procesando
                        </>
                    ) : (
                        "Continuar"
                    )}
                </Button>
            </form>
        </StepLayout>
    );
};