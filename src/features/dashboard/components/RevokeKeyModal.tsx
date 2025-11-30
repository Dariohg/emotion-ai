'use client';

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Loader2, AlertTriangle } from "lucide-react";
import { applicationService } from "../services/application.service";

interface RevokeKeyModalProps {
    apiKeyId: string;
    onSuccess: () => void;
    onCancel: () => void;
}

export const RevokeKeyModal = ({ apiKeyId, onSuccess, onCancel }: RevokeKeyModalProps) => {
    const [step, setStep] = useState<'confirm' | 'code'>('confirm');
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    const handleRequest = async () => {
        setIsLoading(true);
        setError("");
        try {
            await applicationService.requestRevoke(apiKeyId);
            setStep('code');
        } catch (e) {
            console.error(e);
            setError("Error al solicitar código. Intenta nuevamente.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirm = async () => {
        setIsLoading(true);
        setError("");
        try {
            await applicationService.confirmRevoke(apiKeyId, code);
            onSuccess();
        } catch (e) {
            console.error(e);
            setError("Código incorrecto o expirado.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-red-100">
                <div className="flex items-center gap-3 mb-4 text-red-600">
                    <div className="p-2 bg-red-100 rounded-full">
                        <AlertTriangle className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">Revocar API Key</h3>
                </div>

                {step === 'confirm' ? (
                    <>
                        <div className="mb-6 space-y-3 text-gray-600">
                            <p>¿Estás seguro de que deseas revocar esta credencial?</p>
                            <p className="text-sm bg-red-50 p-3 rounded-lg border border-red-200 text-red-800 font-medium">
                                ⚠️ Esta acción detendrá inmediatamente el acceso de tu aplicación. No se puede deshacer.
                            </p>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={onCancel}>Cancelar</Button>
                            <Button
                                className="bg-red-600 hover:bg-red-700 text-white"
                                onClick={handleRequest}
                                disabled={isLoading}
                            >
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Sí, Solicitar Código
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-sm text-gray-600 mb-4">
                            Hemos enviado un código de confirmación de 6 dígitos al correo de la empresa.
                        </p>

                        <div className="mb-6">
                            <Input
                                value={code}
                                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                                placeholder="000000"
                                className="text-center text-3xl tracking-[0.5em] h-16 font-bold border-2 focus:border-red-500 focus:ring-red-200"
                                maxLength={6}
                                autoFocus
                            />
                            {error && <p className="text-red-500 text-sm mt-2 text-center font-medium">{error}</p>}
                        </div>

                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={onCancel}>Cancelar</Button>
                            <Button
                                className="bg-red-600 hover:bg-red-700 text-white"
                                onClick={handleConfirm}
                                disabled={isLoading || code.length < 6}
                            >
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Confirmar y Revocar
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};