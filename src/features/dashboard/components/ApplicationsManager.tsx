'use client';

import React, { useEffect, useState } from "react";
import { applicationService, Application, ApiKeyData } from "../services/application.service";
import { paymentService } from "../services/payment.service";
import { CreateAppForm, CreateAppData } from "./CreateAppModal";
import { RevokeKeyModal } from "./RevokeKeyModal";
import {Key, Copy, ShieldOff, CreditCard, Loader2, Zap, Clock, AlertCircle} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useToast } from "@/src/hooks/use-toast";

export const ApplicationsManager = ({ companyId }: { companyId: string }) => {
    const { toast } = useToast();
    const [apps, setApps] = useState<Application[]>([]);
    const [isPayingId, setIsPayingId] = useState<string | null>(null);
    const [generatedKey, setGeneratedKey] = useState<{ appId: string, key: string } | null>(null);
    const [appKeys, setAppKeys] = useState<Record<string, ApiKeyData[]>>({});
    const [revokingKeyId, setRevokingKeyId] = useState<string | null>(null);
    const [isLoadingCreate, setIsLoadingCreate] = useState(false);

    const fetchApps = async () => {
        try {
            const data = await applicationService.getApplications(companyId);
            setApps(data);
            data.forEach(app => {
                if(app.is_active) fetchAppKeys(app.id);
            });
        } catch (error) {
            console.error("Error fetching apps:", error);
        }
    };

    const fetchAppKeys = async (appId: string) => {
        try {
            const keys = await applicationService.getApplicationKeys(companyId, appId);
            setAppKeys(prev => ({ ...prev, [appId]: keys }));
        } catch (error) {
            console.error(`Error fetching keys for ${appId}:`, error);
        }
    };

    useEffect(() => { if(companyId) fetchApps(); }, [companyId]);

    const handleCreate = async (data: CreateAppData) => {
        setIsLoadingCreate(true);
        try {
            await applicationService.createApplication(companyId, data);
            await fetchApps();
            toast({ title: "Aplicación creada", description: "Ahora actívala realizando el pago." });
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "No se pudo crear la aplicación." });
        } finally {
            setIsLoadingCreate(false);
        }
    };

    const handlePayment = async (appId: string) => {
        setIsPayingId(appId);
        try {
            const response = await paymentService.createPaymentLink(companyId, appId);
            if (response && response.payment_url) {
                window.location.href = response.payment_url;
            } else {
                throw new Error("URL inválida");
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Error de pago", description: "No se pudo generar el enlace." });
            setIsPayingId(null);
        }
    };

    const handleGenerateKey = async (appId: string) => {
        if (!confirm("¿Generar nueva llave? La anterior dejará de funcionar.")) return;
        try {
            const key = await applicationService.generateApiKey(companyId, appId);

            setGeneratedKey({ appId, key: key });

            fetchAppKeys(appId);
            toast({ title: "Éxito", description: "Nueva llave generada correctamente." });
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Fallo al generar key." });
        }
    };

    return (
        <div className="space-y-10">

            {/* Modal de Revocación */}
            {revokingKeyId && (
                <RevokeKeyModal
                    apiKeyId={revokingKeyId}
                    onSuccess={() => { setRevokingKeyId(null); fetchApps(); }}
                    onCancel={() => setRevokingKeyId(null)}
                />
            )}

            {/* Formulario de Creación - Integrado Limpiamente */}
            <CreateAppForm onCreate={handleCreate} isLoading={isLoadingCreate} />

            {/* Notificación de Nueva Key */}
            {generatedKey && (
                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl flex flex-col gap-4 shadow-sm animate-in zoom-in-95 duration-300">
                    <div className="flex items-center gap-3 text-emerald-800">
                        <div className="p-2 bg-emerald-100 rounded-lg"><Key className="h-5 w-5" /></div>
                        <div>
                            <h4 className="font-bold text-lg">Nueva API Key Generada</h4>
                            <p className="text-sm text-emerald-600">Cópiala ahora. Por seguridad no podrás verla de nuevo.</p>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <code className="bg-white px-4 py-3 rounded-xl border border-emerald-200 flex-1 font-mono text-sm break-all shadow-inner text-slate-700">
                            {generatedKey.key}
                        </code>
                        <Button
                            variant="outline"
                            className="h-12 px-4 border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800"
                            onClick={() => {
                                navigator.clipboard.writeText(generatedKey.key);
                                toast({ title: "Copiado", description: "API Key copiada al portapapeles" });
                            }}
                        >
                            <Copy className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Grid de Aplicaciones */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {apps.map((app) => {
                    const keys = appKeys[app.id] || [];
                    const activeKey = keys.find(k => k.is_active);
                    const isPaying = isPayingId === app.id;

                    return (
                        <div key={app.id} className={`group relative bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                            app.is_active
                                ? 'border-slate-200 hover:border-indigo-300 hover:shadow-xl'
                                : 'border-amber-200 hover:border-amber-300 shadow-sm'
                        }`}>
                            {/* Barra de estado superior */}
                            <div className={`h-1.5 w-full ${app.is_active ? 'bg-emerald-500' : 'bg-amber-400'}`} />

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">{app.name}</h3>
                                            {app.is_active ? (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wide border border-emerald-100">
                                                    <Zap className="w-3 h-3 fill-emerald-500 text-emerald-500" /> Activa
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wide border border-amber-100">
                                                    <Clock className="w-3 h-3" /> Pago Pendiente
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-xs px-2 py-1 rounded-md bg-slate-100 text-slate-600 font-medium border border-slate-200 uppercase tracking-wider">
                                                {app.platform}
                                            </span>
                                            <span className="text-xs px-2 py-1 rounded-md bg-slate-100 text-slate-600 font-medium border border-slate-200 uppercase tracking-wider">
                                                {app.environment}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Acciones Principales */}
                                    <div>
                                        {app.is_active ? (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-9 text-xs border-slate-200 hover:border-indigo-300 hover:text-indigo-700"
                                                onClick={() => handleGenerateKey(app.id)}
                                            >
                                                <Key className="mr-2 h-3.5 w-3.5" /> Rotar Key
                                            </Button>
                                        ) : (
                                            <Button
                                                size="sm"
                                                className="h-9 text-xs bg-amber-500 hover:bg-amber-600 text-white border-0 shadow-md shadow-amber-200"
                                                onClick={() => handlePayment(app.id)}
                                                disabled={isPaying}
                                            >
                                                {isPaying ? <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" /> : <CreditCard className="mr-2 h-3.5 w-3.5" />}
                                                {isPaying ? "Procesando..." : "Activar ($500)"}
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                {/* Sección de Credenciales */}
                                <div className="pt-6 border-t border-slate-100">
                                    {app.is_active ? (
                                        <div>
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Credencial de Producción</p>
                                            {activeKey ? (
                                                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 group-hover:bg-white transition-colors">
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                                            <span className="text-sm font-mono text-slate-600">
                                                                {activeKey.prefix}••••••••
                                                            </span>
                                                        </div>
                                                        <span className="text-[10px] text-slate-400 mt-1">
                                                            Creada: {new Date(activeKey.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 w-8 p-0 rounded-lg"
                                                        onClick={() => setRevokingKeyId(activeKey.id)}
                                                        title="Revocar credencial"
                                                    >
                                                        <ShieldOff className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-slate-200 text-center">
                                                    <p className="text-sm text-slate-500">Sin llave activa</p>
                                                    <button
                                                        onClick={() => handleGenerateKey(app.id)}
                                                        className="text-xs text-indigo-600 hover:underline mt-1 font-medium"
                                                    >
                                                        Generar ahora
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50/50 border border-amber-100 text-amber-800">
                                            <AlertCircle className="h-5 w-5 shrink-0" />
                                            <p className="text-xs font-medium leading-snug">
                                                Esta aplicación está en espera de pago. Las credenciales se generarán automáticamente al confirmar.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};