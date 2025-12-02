'use client';

import { useForm } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Loader2, Plus } from "lucide-react";

export interface CreateAppData {
    name: string;
    platform: string;
    environment: string;
}

interface CreateAppFormProps {
    onCreate: (data: CreateAppData) => void;
    isLoading: boolean;
}

export const CreateAppForm = ({ onCreate, isLoading }: CreateAppFormProps) => {
    const { register, handleSubmit, reset } = useForm<CreateAppData>();

    const onSubmit = (data: CreateAppData) => {
        onCreate(data);
        reset();
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-900">Nueva Aplicación</h3>
                    <p className="text-sm text-slate-500">Registra un nuevo cliente para consumir la API.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full space-y-2">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Nombre</label>
                    <Input
                        {...register("name", { required: true })}
                        placeholder="Ej: Learning App iOS"
                        className="bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                    />
                </div>

                <div className="w-full md:w-40 space-y-2">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Plataforma</label>
                    <select
                        {...register("platform")}
                        className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    >
                        <option value="mobile">Móvil</option>
                        <option value="web">Web</option>
                        <option value="desktop">Desktop</option>
                    </select>
                </div>

                <div className="w-full md:w-40 space-y-2">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Ambiente</label>
                    <select
                        {...register("environment")}
                        className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    >
                        <option value="development">Desarrollo</option>
                        <option value="production">Producción</option>
                    </select>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md shadow-indigo-500/20 transition-all"
                >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                    Crear App
                </Button>
            </form>
        </div>
    );
};