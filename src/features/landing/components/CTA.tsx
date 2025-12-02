'use client'; // Necesario para manejar eventos

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

export const CTA = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Creamos la URL con los parámetros para pasarlos al registro
        const params = new URLSearchParams();
        if (formData.name) params.set('name', formData.name);
        if (formData.email) params.set('email', formData.email);

        // Redirigimos al usuario a la página de registro real
        router.push(`/register?${params.toString()}`);
    };

    return (
        <section id="cta" className="py-24 bg-slate-50">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2">

                        {/* Columna de Texto (Sin cambios visuales) */}
                        <div className="p-12 lg:p-16 flex flex-col justify-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                                ¿Listo para transformar tu plataforma educativa?
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Nuestra API se integra en minutos. Comienza tu prueba gratuita hoy mismo y lleva la educación emocional al siguiente nivel.
                            </p>

                            <ul className="space-y-4 mb-8">
                                {[
                                    "Documentación API completa",
                                    "Soporte técnico directo",
                                    "Prueba gratuita de 30 días"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center text-slate-700">
                                        <svg className="w-5 h-5 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Columna del Formulario (Ahora FUNCIONAL) */}
                        <div className="bg-slate-50 p-12 lg:p-16 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-slate-100">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                        Correo Electrónico Profesional
                                    </label>
                                    <Input
                                        type="email"
                                        id="email"
                                        placeholder="nombre@empresa.com"
                                        className="h-12 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                                        Nombre Completo
                                    </label>
                                    <Input
                                        type="text"
                                        id="name"
                                        placeholder="Tu nombre"
                                        className="h-12 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>

                                <Button type="submit" className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg shadow-lg shadow-indigo-500/20 transition-all">
                                    Comenzar Registro
                                </Button>

                                <p className="text-center text-xs text-slate-500 mt-4">
                                    Al continuar, aceptas nuestros términos de servicio.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};