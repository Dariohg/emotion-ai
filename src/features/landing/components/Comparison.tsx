import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export const Comparison = () => {
    // Definimos los datos de comparación para mantener el código limpio
    const comparisonData = [
        {
            criterio: "Enfoque Principal",
            emotionAi: "Alfabetización Inclusiva",
            genericas: "Investigación de Mercados",
            terapeuticas: "Entrenamiento Clínico"
        },
        {
            criterio: "Privacidad",
            emotionAi: "Procesamiento Local (Edge)",
            genericas: "Envío a Nube (Riesgo)",
            terapeuticas: "Cumplimiento HIPAA (Costoso)"
        },
        {
            criterio: "Hardware",
            emotionAi: "Webcam Estándar",
            genericas: "Cámaras Especializadas",
            terapeuticas: "Sensores Biométricos"
        },
        {
            criterio: "Costo",
            emotionAi: "Accesible (SaaS)",
            genericas: "Alto (Enterprise)",
            terapeuticas: "Muy Alto (Médico)"
        }
    ];

    return (
        <section className="py-24 bg-white relative">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                        ¿Por qué somos diferentes?
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Diseñado específicamente para el contexto educativo, no para vender publicidad.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xl bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-6 text-sm font-semibold uppercase tracking-wider text-slate-500 w-1/4">
                                    Criterio
                                </th>
                                <th className="p-6 text-sm font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50/50 w-1/4 border-x border-indigo-100">
                                    Emotion AI
                                </th>
                                <th className="p-6 text-sm font-semibold uppercase tracking-wider text-slate-500 w-1/4">
                                    Soluciones Genéricas
                                </th>
                                <th className="p-6 text-sm font-semibold uppercase tracking-wider text-slate-500 w-1/4">
                                    Soluciones Terapéuticas
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                            {comparisonData.map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-6 font-medium text-slate-900">
                                        {row.criterio}
                                    </td>
                                    {/* Columna Destacada (Nuestra Solución) */}
                                    <td className="p-6 bg-indigo-50/10 border-x border-indigo-50">
                                        <div className="flex items-center gap-2 font-semibold text-indigo-900">
                                            <FaCheckCircle className="text-indigo-600 h-5 w-5 flex-shrink-0" />
                                            {row.emotionAi}
                                        </div>
                                    </td>
                                    <td className="p-6 text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <FaTimesCircle className="text-slate-300 h-5 w-5 flex-shrink-0" />
                                            {row.genericas}
                                        </div>
                                    </td>
                                    <td className="p-6 text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <FaTimesCircle className="text-slate-300 h-5 w-5 flex-shrink-0" />
                                            {row.terapeuticas}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};