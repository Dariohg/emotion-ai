import Image from 'next/image';

export const TechOverview = () => {
    return (
        <section id="tecnologia" className="py-24 bg-slate-50 overflow-hidden">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Imagen / Visualización */}
                    <div className="w-full lg:w-1/2 relative order-2 lg:order-1">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-2xl blur-2xl opacity-20 -rotate-3"></div>
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
                            <Image
                                src="/face_mesh.png"
                                alt="Malla facial de 468 puntos"
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover transform transition-transform hover:scale-105 duration-700"
                            />


                        </div>
                    </div>

                    {/* Contenido Texto */}
                    <div className="w-full lg:w-1/2 order-1 lg:order-2">
                        <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full">
                            Arquitectura
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                            Integración <span className="text-indigo-600">No Invasiva</span>
                        </h2>

                        <div className="space-y-6 text-lg text-slate-600">
                            <p>
                                Diseñamos el agente como una librería ligera. En lugar de forzar al usuario a cambiar de contexto, <strong className="text-slate-900">todo ocurre dentro de la aplicación principal</strong>.
                            </p>
                            <p>
                                Utilizamos <strong>ML Kit</strong> para proyectar una malla facial de alta densidad en tiempo real. Analizamos micro-expresiones sin guardar video, garantizando velocidad y privacidad.
                            </p>
                        </div>

                        <div className="mt-10 grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                                <div className="text-2xl font-bold text-slate-900 mb-1">~15ms</div>
                                <div className="text-sm text-slate-500">Latencia de análisis</div>
                            </div>
                            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                                <div className="text-2xl font-bold text-slate-900 mb-1">Local</div>
                                <div className="text-sm text-slate-500">Procesamiento Edge</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};