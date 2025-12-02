import { useForm } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { StepLayout } from "./StepLayout";
import { Loader2 } from "lucide-react";

// CORRECCIÓN: Agregamos 'email' a la interfaz
interface VerificationCodeStepProps {
    email: string; // <--- FALTABA ESTO
    onVerify: (code: string) => void;
    onResend: () => void;
    isLoading: boolean;
}

export const VerificationCodeStep = ({ email, onVerify, onResend, isLoading }: VerificationCodeStepProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { code: '' }
    });

    return (
        <StepLayout
            title="Verifica tu correo"
            subtitle={`Ingresa el código enviado a ${email}`} // Ahora podemos usar 'email' aquí
        >
            <form onSubmit={handleSubmit((data) => onVerify(data.code))} className="space-y-6">
                <div>
                    <label htmlFor="code" className="block text-sm font-medium text-slate-700 mb-1.5">
                        Código de Verificación
                    </label>
                    <Input
                        id="code"
                        placeholder="123456"
                        maxLength={6}
                        {...register("code", {
                            required: "El código es obligatorio",
                            minLength: { value: 6, message: "El código debe tener 6 dígitos" }
                        })}
                        className="h-12 text-center text-2xl tracking-widest border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 font-mono bg-slate-50"
                    />
                    {errors.code && <p className="mt-1 text-xs text-red-500">{errors.code.message}</p>}
                </div>

                <div className="flex flex-col gap-3">
                    <Button
                        type="submit"
                        className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-base shadow-lg shadow-indigo-500/20 transition-all"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verificando
                            </>
                        ) : (
                            "Verificar Cuenta"
                        )}
                    </Button>

                    <button
                        type="button"
                        onClick={onResend}
                        className="text-sm text-slate-500 hover:text-indigo-600 transition-colors font-medium"
                        disabled={isLoading}
                    >
                        ¿No recibiste el código? Reenviar
                    </button>
                </div>
            </form>
        </StepLayout>
    );
};