
'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { companyService } from "../services/company.service";
import { Loader2, Save } from "lucide-react";

export const CompanySettings = ({ companyId, initialName }: { companyId: string, initialName: string }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit } = useForm({ defaultValues: { name: initialName } });

    const onSubmit = async (data: { name: string }) => {
        setIsLoading(true);
        try {
            await companyService.updateCompany(companyId, { name: data.name });
            alert("Empresa actualizada correctamente");
        } catch (error) {
            console.error(error);
            alert("Error al actualizar");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Configuración de Empresa</CardTitle>
                <CardDescription>Actualiza los datos de tu organización.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 items-end">
                    <div className="flex-1 space-y-2">
                        <label className="text-sm font-medium">Nombre de la Empresa</label>
                        <Input {...register("name")} />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Guardar Cambios
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};