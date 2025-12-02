import { UseFormReturn } from "react-hook-form";
import { Mail, Loader2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/src/components/ui/form";

interface EmailStepProps {
    form: UseFormReturn<any>;
    onSubmit: (values: any) => Promise<void>;
    isLoading: boolean;
    error?: string;
}

export const EmailStep = ({ form, onSubmit, isLoading, error }: EmailStepProps) => {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Correo Electrónico
                            </label>
                            <FormControl>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <Input
                                        placeholder="nombre@empresa.com"
                                        className="pl-10 h-12 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50 transition-all hover:bg-white"
                                        autoComplete="email"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage className="text-xs text-red-500 mt-1" />
                        </FormItem>
                    )}
                />

                {error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                        <span className="h-2 w-2 rounded-full bg-red-500 shrink-0" />
                        {error}
                    </div>
                )}

                <Button
                    type="submit"
                    className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-base shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98]"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Buscando cuenta...
                        </>
                    ) : (
                        "Continuar"
                    )}
                </Button>
            </form>
        </Form>
    );
};