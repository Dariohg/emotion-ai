'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { companyService } from "../services/company.service";
import { Loader2, Save, Building2 } from "lucide-react";
import { useToast } from "@/src/hooks/use-toast";

export const CompanySettings = ({ companyId, initialName }: { companyId: string, initialName: string }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit } = useForm({ defaultValues: { name: initialName } });
    const { toast } = useToast();

    const onSubmit = async (data: { name: string }) => {
        setIsLoading(true);
        try {
            await companyService.updateCompany(companyId, { name: data.name });
            toast({ title: "Actualizado", description: "Los datos de la empresa se han guardado." });
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "No se pudo actualizar." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-600">
                        <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Perfil de Organización</h3>
                        <p className="text-sm text-slate-500">Gestiona la información pública de tu empresa.</p>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Nombre de la Empresa</label>
                        <Input
                            {...register("name")}
                            className="max-w-md bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                        />
                        <p className="text-xs text-slate-500">Este nombre aparecerá en tus facturas y correos.</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <Button type="submit" disabled={isLoading} className="bg-slate-900 hover:bg-slate-800 text-white">
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Guardar Cambios
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};