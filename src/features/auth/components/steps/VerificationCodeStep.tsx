import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "@/src/lib/schemas";
import { z } from "zod";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { StepLayout } from "./StepLayout";
import { Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";

type OtpValues = z.infer<typeof otpSchema>;

interface VerificationCodeStepProps {
    email: string;
    onVerify: (code: string) => void;
    onResend: () => void;
    isLoading: boolean;
    isActive: boolean;
    isCompleted: boolean;
}

export const VerificationCodeStep = ({ email, onVerify, onResend, isLoading, isActive, isCompleted }: VerificationCodeStepProps) => {

    const form = useForm<OtpValues>({
        resolver: zodResolver(otpSchema),
        defaultValues: { code: '' }
    });

    return (
        <StepLayout
            title="Verifica tu correo"
            subtitle={`Ingresa el código enviado a ${email}`}
            isActive={isActive}
            isCompleted={isCompleted}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => onVerify(data.code))} className="space-y-6">

                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Código de Verificación</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="123456"
                                        maxLength={6}
                                        className="h-12 text-center text-2xl tracking-widest font-mono bg-slate-50"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-col gap-3">
                        <Button
                            type="submit"
                            className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Verificar Cuenta"}
                        </Button>

                        <button
                            type="button"
                            onClick={onResend}
                            className="text-sm text-slate-500 hover:text-indigo-600 font-medium"
                            disabled={isLoading}
                        >
                            ¿No recibiste el código? Reenviar
                        </button>
                    </div>
                </form>
            </Form>
        </StepLayout>
    );
};