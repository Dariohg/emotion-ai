'use client';

import { useEffect, useState } from "react";
import { Navbar } from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/layout/Footer";
import { CompanySettings } from "@/src/features/dashboard/components/CompanySettings";
import { ApplicationsManager } from "@/src/features/dashboard/components/ApplicationsManager";
import { useRouter } from "next/navigation";
import { Loader2, LayoutGrid, Settings } from "lucide-react";

interface CompanyData {
    id: string;
    name: string;
    email: string;
}

export default function DashboardPage() {
    const [company, setCompany] = useState<CompanyData | null>(null);
    const [activeTab, setActiveTab] = useState<'apps' | 'settings'>('apps');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const companyDataStr = localStorage.getItem('company_data');

        if (!token || !companyDataStr) {
            router.push('/login');
            return;
        }
        try {
            setCompany(JSON.parse(companyDataStr));
        } catch (e) {
            router.push('/login');
        }
    }, [router]);

    if (!company) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center space-y-4">
                    <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mx-auto" />
                    <p className="text-slate-500 animate-pulse">Cargando tu espacio...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            {/* pt-24 para compensar el navbar fijo */}
            <main className="flex-1 container mx-auto max-w-7xl px-6 pt-32 pb-20">

                {/* Header con Bienvenida */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            Hola, {company.name}
                        </h1>
                        <p className="text-slate-500 mt-1">
                            Gestiona tus integraciones y credenciales desde un solo lugar.
                        </p>
                    </div>

                    {/* Switcher de Vistas (Tabs Modernas) */}
                    <div className="flex p-1 bg-white border border-slate-200 rounded-xl shadow-sm">
                        <button
                            onClick={() => setActiveTab('apps')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                activeTab === 'apps'
                                    ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                            }`}
                        >
                            <LayoutGrid className="h-4 w-4" /> Aplicaciones
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                activeTab === 'settings'
                                    ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                            }`}
                        >
                            <Settings className="h-4 w-4" /> Configuración
                        </button>
                    </div>
                </div>

                {/* Área de Contenido */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {activeTab === 'apps' ? (
                        <ApplicationsManager companyId={company.id} />
                    ) : (
                        <div className="max-w-2xl mx-auto">
                            <CompanySettings companyId={company.id} initialName={company.name} />
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}