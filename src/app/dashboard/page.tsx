
'use client';

import { useEffect, useState } from "react";
import { Navbar } from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/layout/Footer";
import { CompanySettings } from "@/src/features/dashboard/components/CompanySettings";
import { ApplicationsManager } from "@/src/features/dashboard/components/ApplicationsManager";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

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
        // Verificar sesión
        const token = localStorage.getItem('auth_token');
        const companyDataStr = localStorage.getItem('company_data');

        if (!token || !companyDataStr) {
            router.push('/login');
            return;
        }

        try {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCompany(JSON.parse(companyDataStr));
        } catch (e) {
            router.push('/login');
        }
    }, [router]);

    if (!company) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto max-w-7xl px-4 py-8">
                {/* Header del Dashboard */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Hola, {company.name}</h1>
                    <p className="text-gray-600">Gestiona tus aplicaciones y credenciales de API.</p>
                </div>

                {/* Tabs de Navegación */}
                <div className="flex border-b border-gray-200 mb-8">
                    <button
                        onClick={() => setActiveTab('apps')}
                        className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
                            activeTab === 'apps'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Mis Aplicaciones
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
                            activeTab === 'settings'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Configuración de Empresa
                    </button>
                </div>

                {/* Contenido */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {activeTab === 'apps' ? (
                        <ApplicationsManager companyId={company.id} />
                    ) : (
                        <div className="max-w-2xl">
                            <CompanySettings companyId={company.id} initialName={company.name} />
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}