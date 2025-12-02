import { IoAnalyticsSharp, IoSchoolSharp, IoSyncCircleSharp, IoSparklesSharp } from "react-icons/io5";

export const Benefits = () => {
    const benefitsList = [
        {
            icon: <IoSyncCircleSharp className="h-8 w-8" />,
            title: "Alertas Visuales Contextuales",
            description: "Al detectar confusión, activa retroalimentación visual inmediata sugiriendo 'revisar la lección' o 'concentrarse'."
        },
        {
            icon: <IoSchoolSharp className="h-8 w-8" />,
            title: "Diseño Inclusivo Co-creado",
            description: "Requerimientos validados con más de 40 educadores, familiares y personas de la comunidad sorda."
        },
        {
            icon: <IoSparklesSharp className="h-8 w-8" />,
            title: "Enfoque 100% No Oral",
            description: "A diferencia de otras IAs, nuestro sistema no depende de señales de voz, priorizando el análisis visual."
        },
        {
            icon: <IoAnalyticsSharp className="h-8 w-8" />,
            title: "Métricas Pedagógicas Reales",
            description: "Genera indicadores de progreso basados en el estado emocional durante la lectoescritura, no solo en aciertos.",
            status: "Próximamente"
        }
    ];

    return (
        <section id="beneficios" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Elemento decorativo de fondo */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

            <div className="container mx-auto max-w-7xl px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
                        Una solución centrada en el alumno
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Tecnología diseñada para entender lo que las palabras no dicen, mejorando la experiencia educativa.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {benefitsList.map((benefit, index) => (
                        <div key={index} className="group p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300">
                            <div className="flex items-start gap-5">
                                <div className="flex-shrink-0 p-3 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                    {benefit.icon}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-slate-900">{benefit.title}</h3>
                                        {benefit.status && (
                                            <span className="inline-flex items-center rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-800">
                                                {benefit.status}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-slate-600 leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};