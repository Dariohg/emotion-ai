export const HowItWorks = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        ¿Cómo se integra?
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Una arquitectura plug-and-play diseñada para escalar con tu aplicación educativa.
                    </p>
                </div>

                <div className="relative">
                    {/* Línea conectora (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-100 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                        {/* Paso 1 */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-24 h-24 rounded-2xl bg-white border-4 border-indigo-50 flex items-center justify-center mb-8 shadow-sm group-hover:border-indigo-100 group-hover:scale-110 transition-all duration-300">
                                <span className="text-4xl font-bold text-indigo-600">1</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Integración SDK</h3>
                            <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
                                Nuestra IA se entrega como un componente listo para usar. Tu app solo necesita importarlo como una librería estándar.
                            </p>
                        </div>

                        {/* Paso 2 */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-24 h-24 rounded-2xl bg-white border-4 border-violet-50 flex items-center justify-center mb-8 shadow-sm group-hover:border-violet-100 group-hover:scale-110 transition-all duration-300">
                                <span className="text-4xl font-bold text-violet-600">2</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Análisis en Segundo Plano</h3>
                            <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
                                El asistente gestiona la cámara y el procesamiento biométrico localmente, respetando la privacidad del usuario.
                            </p>
                        </div>

                        {/* Paso 3 */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-24 h-24 rounded-2xl bg-white border-4 border-indigo-50 flex items-center justify-center mb-8 shadow-sm group-hover:border-indigo-100 group-hover:scale-110 transition-all duration-300">
                                <span className="text-4xl font-bold text-indigo-600">3</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Eventos en Tiempo Real</h3>
                            <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
                                Recibe eventos de "confusión" o "frustración" al instante para detonar ayudas pedagógicas automáticas.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};