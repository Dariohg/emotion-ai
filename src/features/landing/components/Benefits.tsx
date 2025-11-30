import { IoAnalyticsSharp, IoSchoolSharp, IoSyncCircleSharp, IoSparklesSharp } from "react-icons/io5";

export const Benefits = () => {
    const benefitsList = [
        {
            icon: <IoSyncCircleSharp />,
            title: "Alertas Visuales Contextuales",
            description: "Al detectar confusión o distracción, activa retroalimentación visual inmediata, sugiriendo al usuario 'revisar la lección' o 'concentrarse en la pantalla'."
        },
        {
            icon: <IoSchoolSharp />,
            title: "Diseño Co-creado Inclusivo",
            description: "Requerimientos validados con más de 40 educadores, familiares y personas sordas."
        },
        {
            icon: <IoSparklesSharp />,
            title: "Enfoque 100% No Oral",
            description: "A diferencia de otras IAs, nuestro sistema no depende de señales de voz, solo de análisis visual."
        },
        {
            icon: <IoAnalyticsSharp />,
            title: "Métricas Pedagógicas Reales",
            description: "Genera indicadores de progreso basados en el estado emocional durante la lectoescritura, no solo en aciertos.",
            status: "Próximamente"
        }
    ];

    return (
        <section id="beneficios" className="bg-white py-24">
            <div className="container mx-auto max-w-7xl px-6">
                <h2 className="mb-16 text-center text-3xl font-bold text-gray-900 md:text-4xl">
                    Una solución centrada en el alumno
                </h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {benefitsList.map((benefit, index) => (
                        <div key={index} className="rounded-lg border border-gray-200 p-8 text-left transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                            <div className="mb-4 text-4xl text-secondary">{benefit.icon}</div>
                            <div className="flex items-center gap-3">
                                <h3 className="mb-2 text-xl font-semibold text-gray-900">{benefit.title}</h3>
                                {benefit.status && (
                                    <span className="mb-2 rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800">
                                        {benefit.status}
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-600">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};