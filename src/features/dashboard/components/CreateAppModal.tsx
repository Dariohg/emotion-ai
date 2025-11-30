'use client';

import { useForm } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Loader2, Plus } from "lucide-react";

// 1. Definimos la interfaz para los datos del formulario
export interface CreateAppData {
    name: string;
    platform: string;
    environment: string;
}

// 2. Tipamos las props del componente
interface CreateAppFormProps {
    onCreate: (data: CreateAppData) => void;
    isLoading: boolean;
}

export const CreateAppForm = ({ onCreate, isLoading }: CreateAppFormProps) => {
    // 3. Tipamos el hook useForm
    const { register, handleSubmit, reset } = useForm<CreateAppData>();

    const onSubmit = (data: CreateAppData) => {
        onCreate(data);
        reset();
    };

    return (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold mb-4 text-sm uppercase text-gray-500">Crear Nueva Aplicación</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="space-y-2">
                    <label className="text-xs font-medium">Nombre</label>
                    <Input
                        {...register("name", { required: true })}
                        placeholder="Ej: App iOS"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-medium">Plataforma</label>
                    <select
                        {...register("platform")}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        <option value="mobile">Móvil</option>
                        <option value="web">Web</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-medium">Ambiente</label>
                    <select
                        {...register("environment")}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        <option value="development">Desarrollo</option>
                        <option value="staging">Pruebas</option>
                        <option value="production">Producción</option>
                    </select>
                </div>
                <Button type="submit" disabled={isLoading} className="bg-secondary hover:bg-secondary/90 text-white">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                    Crear App
                </Button>
            </form>
        </div>
    );
};