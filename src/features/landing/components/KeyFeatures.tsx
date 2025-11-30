import { FaRegSmile, FaRegEye } from 'react-icons/fa';
import { IoAnalyticsSharp, IoNotificationsCircleSharp } from "react-icons/io5";

const features = [
    {
        icon: <FaRegSmile className="text-white" />,
        title: "Análisis Emocional No Oral",
        description: "Identifica emociones clave para el aprendizaje como interés, frustración y confusión usando solo la cámara."
    },
    {
        icon: <FaRegEye className="text-white" />,
        title: "Seguimiento de Atención Ocular",
        description: "Evalúa si el usuario mantiene el contacto visual con la pantalla para detectar distracción."
    },
    {
        icon: <IoNotificationsCircleSharp className="text-white" />,
        title: "Retroalimentación Visual",
        description: "Proporciona alertas contextuales como 'revisa la lección' o 'concéntrate' cuando detecta pérdida de enfoque."
    },
    {
        icon: <IoAnalyticsSharp className="text-white" />,
        title: "Métricas de Progreso Emocional",
        description: "Genera métricas para educadores y familiares sobre el desempeño emocional y los niveles de atención del alumno."
    },
];

export const KeyFeatures = () => {
    return (
        <section id="caracteristicas" className="bg-secondary py-24 text-white">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                    <div>
                        <span className="font-semibold uppercase tracking-wider text-primary">
                            Características Principales
                        </span>
                        <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
                            Un motor de IA especializado
                        </h2>
                        <p className="mt-6 text-lg text-gray-100">
                            No es solo una app, es un servicio backend inteligente diseñado para especializarse en las señales únicas de la comunidad sorda.
                        </p>
                    </div>
                    <div className="space-y-8">
                        {features.map((feature) => (
                            <div key={feature.title} className="flex gap-4">
                                <div className="flex-shrink-0 text-3xl">{feature.icon}</div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                                    <p className="mt-1 text-gray-100">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};