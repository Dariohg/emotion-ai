import { FaRegSmile, FaRegEye } from 'react-icons/fa';
import { IoAnalyticsSharp, IoNotificationsCircleSharp } from "react-icons/io5";

const features = [
    {
        icon: <FaRegSmile className="h-6 w-6" />,
        title: "Análisis Emocional",
        description: "Identifica interés, frustración y confusión usando solo la cámara."
    },
    {
        icon: <FaRegEye className="h-6 w-6" />,
        title: "Seguimiento Ocular",
        description: "Evalúa el contacto visual con la pantalla para detectar distracción."
    },
    {
        icon: <IoNotificationsCircleSharp className="h-6 w-6" />,
        title: "Feedback Visual",
        description: "Alertas contextuales no intrusivas cuando se detecta pérdida de enfoque."
    },
    {
        icon: <IoAnalyticsSharp className="h-6 w-6" />,
        title: "Métricas de Progreso",
        description: "Reportes detallados para educadores sobre el desempeño emocional."
    },
];

export const KeyFeatures = () => {
    return (
        <section id="caracteristicas" className="py-24 bg-slate-900 text-white relative overflow-hidden">
            {/* Brillo de fondo */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1/3 h-full bg-indigo-500/10 blur-[100px] pointer-events-none" />

            <div className="container mx-auto max-w-7xl px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 text-indigo-400 font-semibold uppercase tracking-wider text-sm mb-4">
                            <span className="w-8 h-[2px] bg-indigo-500"></span>
                            Motor de Inteligencia
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
                            Un backend especializado en señales no verbales
                        </h2>
                        <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                            No es solo una app, es un servicio inteligente diseñado específicamente para interpretar las señales únicas de la comunidad sorda, procesando datos biométricos en tiempo real con privacidad total.
                        </p>

                        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700 backdrop-blur-sm">
                            <div className="flex items-center gap-4">
                                <div className="text-4xl font-bold text-indigo-400">95%</div>
                                <div className="text-sm text-slate-400">
                                    Precisión en detección de<br/>estados de confusión
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {features.map((feature, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-slate-800 border border-slate-700 hover:border-indigo-500/50 hover:bg-slate-750 transition-all group">
                                <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 group-hover:text-indigo-300 group-hover:bg-indigo-500/20 transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};