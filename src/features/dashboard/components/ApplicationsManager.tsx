'use client';

import { useEffect, useState } from "react";
import {
    applicationService,
    Application,
    ApiKeyData,
    CreateAppResponse
} from "../services/application.service";
import { CreateAppForm, CreateAppData } from "./CreateAppModal";
import { RevokeKeyModal } from "./RevokeKeyModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Key, Copy, ShieldOff, Power } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export const ApplicationsManager = ({ companyId }: { companyId: string }) => {
    const [apps, setApps] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [generatedKey, setGeneratedKey] = useState<{ appId: string, key: string } | null>(null);

    // Almacenar keys por app
    const [appKeys, setAppKeys] = useState<Record<string, ApiKeyData[]>>({});

    // ID de la Key que se está revocando
    const [revokingKeyId, setRevokingKeyId] = useState<string | null>(null);

    const fetchApps = async () => {
        try {
            const data = await applicationService.getApplications(companyId);
            setApps(data);

            // Cargar keys para cada app encontrada
            data.forEach(app => fetchAppKeys(app.id));
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

    useEffect(() => {
        if(companyId) fetchApps();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyId]);

    const handleCreate = async (data: CreateAppData) => {
        setIsLoading(true);
        try {
            // Solución al error 'any': Tipamos explícitamente la respuesta
            const res: CreateAppResponse = await applicationService.createApplication(companyId, data);
            setGeneratedKey({ appId: res.application.id, key: res.api_key });
            fetchApps();
        } catch (error) {
            alert("Error al crear aplicacion");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateKey = async (appId: string) => {
        // Sin emojis
        if (!confirm("ATENCION: Generar una nueva llave desactivara automaticamente la llave anterior. Deseas continuar?")) return;
        try {
            const key = await applicationService.generateApiKey(companyId, appId);
            setGeneratedKey({ appId, key });
            fetchAppKeys(appId);
        } catch (error) {
            alert("Error generando key");
        }
    };

    return (
        <div className="space-y-8">
            {revokingKeyId && (
                <RevokeKeyModal
                    apiKeyId={revokingKeyId}
                    onSuccess={() => {
                        setRevokingKeyId(null);
                        fetchApps();
                        alert("Credencial revocada correctamente.");
                    }}
                    onCancel={() => setRevokingKeyId(null)}
                />
            )}

            <CreateAppForm onCreate={handleCreate} isLoading={isLoading} />

            {generatedKey && (
                <div className="bg-green-50 border border-green-200 p-6 rounded-xl flex flex-col gap-3 mb-8 shadow-sm animate-in fade-in slide-in-from-top-4">
                    <h4 className="text-green-800 font-bold flex items-center gap-2 text-lg">
                        <Key className="h-5 w-5" /> Nueva API Key Generada
                    </h4>
                    <p className="text-sm text-green-700">Copiala ahora mismo. Por seguridad, no podras verla nuevamente.</p>
                    <div className="flex gap-2 items-center">
                        <code className="bg-white px-4 py-3 rounded-lg border border-green-300 flex-1 overflow-x-auto font-mono text-sm break-all shadow-inner select-all">
                            {generatedKey.key}
                        </code>
                        <Button
                            variant="outline"
                            className="h-12 px-4 border-green-300 text-green-700 hover:bg-green-100"
                            onClick={() => navigator.clipboard.writeText(generatedKey.key)}
                        >
                            <Copy className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {apps.map((app) => {
                    const keys = appKeys[app.id] || [];
                    const activeKey = keys.find(k => k.is_active);

                    return (
                        <Card key={app.id} className={`transition-all duration-300 border-2 ${app.is_active ? 'hover:shadow-lg border-transparent' : 'opacity-75 border-gray-200 bg-gray-50'}`}>
                            <CardHeader className="pb-3 border-b border-gray-100 bg-white rounded-t-xl">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-lg font-bold text-gray-900">{app.name}</CardTitle>
                                            {!app.is_active && (
                                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-100 text-red-600 tracking-wide">
                                                    Deshabilitada
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex gap-2 mt-2">
                                            <span className="text-xs px-2 py-1 rounded-md bg-blue-50 text-blue-700 font-medium capitalize border border-blue-100">
                                                {app.platform}
                                            </span>
                                            <span className="text-xs px-2 py-1 rounded-md bg-purple-50 text-purple-700 font-medium capitalize border border-purple-100">
                                                {app.environment}
                                            </span>
                                        </div>
                                    </div>

                                    {app.is_active && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-xs h-8"
                                            onClick={() => handleGenerateKey(app.id)}
                                        >
                                            <Key className="mr-1.5 h-3.5 w-3.5" /> Rotar Key
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>

                            <CardContent className="pt-5 bg-white rounded-b-xl">
                                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Credencial Actual</h5>

                                {activeKey ? (
                                    <div className="flex items-center justify-between p-3 rounded-lg border border-green-200 bg-green-50/50">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                                <span className="text-sm font-medium text-green-900">Activa</span>
                                            </div>
                                            <span className="text-[10px] text-green-700 mt-1">
                                                Creada: {new Date(activeKey.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-600 hover:text-red-700 hover:bg-red-100 h-8 px-3"
                                            onClick={() => setRevokingKeyId(activeKey.id)}
                                        >
                                            <ShieldOff className="h-4 w-4 mr-1.5" /> Revocar
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center p-4 rounded-lg border border-dashed border-gray-200 bg-gray-50 text-center">
                                        <Power className="h-6 w-6 text-gray-300 mb-2" />
                                        <p className="text-sm text-gray-500 font-medium">Sin credenciales activas</p>
                                        {app.is_active && (
                                            <p className="text-xs text-gray-400 mt-1">Genera una nueva key para usar esta app</p>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};