'use client';

import { IoShieldCheckmarkOutline, IoLockClosedOutline, IoPersonOutline, IoDocumentTextOutline } from "react-icons/io5";

export const TermsContent = () => {
    const sections = [
        {
            icon: <IoPersonOutline />,
            title: "Responsable del Tratamiento",
            content: "Universidad Politécnica de Chiapas, con domicilio en Carretera Tuxtla Gutierrez. - Portillo Zaragoza Km 21+500, Las Brisas, 29150 Suchiapa, Chis., es responsable del tratamiento de los datos personales que nos proporcione, los cuales serán protegidos conforme a lo dispuesto por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares."
        },
        {
            icon: <IoDocumentTextOutline />,
            title: "Datos Personales Recabados",
            content: "Para el uso de APRENDIA Emotion AI, podemos recabar los siguientes datos:",
            list: [
                "Datos de identificación: nombre, correo electrónico",
                "Datos biométricos sensibles: imagen facial capturada a través de la cámara del dispositivo para análisis de expresiones faciales",
                "Datos de navegación y uso de la plataforma: tiempo de sesión, progreso en lecciones, interacciones con el sistema"
            ]
        },
        {
            icon: <IoShieldCheckmarkOutline />,
            title: "Finalidades del Tratamiento",
            content: "Sus datos personales serán utilizados para las siguientes finalidades:",
            list: [
                "Principales (necesarias para el servicio):",
                "  • Detectar y analizar expresiones faciales (confusión, interés, frustración) en tiempo real",
                "  • Proporcionar retroalimentación visual personalizada durante el aprendizaje",
                "  • Generar métricas de progreso y estado emocional durante las sesiones de aprendizaje",
                "  • Mejorar la experiencia educativa adaptando contenidos según las emociones detectadas",
                "",
                "Secundarias (requieren consentimiento expreso):",
                "  • Análisis estadístico y estudios de investigación educativa",
                "  • Mejora y desarrollo de algoritmos de reconocimiento facial",
                "  • Envío de información sobre actualizaciones y nuevas funcionalidades"
            ]
        },
        {
            icon: <IoLockClosedOutline />,
            title: "Protección de Datos Sensibles",
            content: "Los datos biométricos (imágenes faciales) son considerados datos personales sensibles. El tratamiento de estos datos requiere su consentimiento expreso. Estos datos se procesan únicamente en tiempo real para el análisis emocional y NO se almacenan de forma permanente en nuestros servidores. Solo se conservan métricas anónimas y agregadas."
        }
    ];

    const rights = [
        "Acceder a sus datos personales y conocer los detalles del tratamiento",
        "Rectificar sus datos en caso de ser inexactos o incompletos",
        "Cancelar el uso de sus datos personales",
        "Oponerse al tratamiento de sus datos personales para fines específicos"
    ];

    return (
        <section id="privacidad" className="bg-gray-50 py-12 md:py-24">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                {/* Header */}
                <div className="mb-8 md:mb-16 text-center">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-4xl">
                        Aviso de Privacidad
                    </h2>
                    <p className="mx-auto max-w-3xl text-base md:text-lg text-gray-600">
                        Conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares,
                        la Universidad Politécnica de Chiapas pone a su disposición el presente Aviso de Privacidad.
                    </p>
                    <p className="mt-4 text-sm text-gray-500">
                        Última actualización: Enero 2025
                    </p>
                </div>

                {/* Main Sections */}
                <div className="space-y-4 md:space-y-8">
                    {sections.map((section, index) => (
                        <div key={index} className="rounded-lg border border-gray-200 bg-white p-4 md:p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg">
                            <div className="mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
                                <div className="text-2xl md:text-3xl text-primary flex-shrink-0">{section.icon}</div>
                                <h3 className="text-lg md:text-2xl font-semibold text-gray-900">{section.title}</h3>
                            </div>
                            <p className="mb-3 md:mb-4 text-sm md:text-base text-gray-700 leading-relaxed">{section.content}</p>
                            {section.list && (
                                <ul className="ml-2 md:ml-4 space-y-1 md:space-y-2 text-sm md:text-base text-gray-700">
                                    {section.list.map((item, idx) => (
                                        <li key={idx} className={item.startsWith('  •') ? "ml-4 md:ml-6" : item.startsWith('Principales') || item.startsWith('Secundarias') ? "mt-2 md:mt-3 font-semibold text-gray-900" : ""}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                {/* ARCO Rights */}
                <div className="mt-8 md:mt-12 rounded-lg border-2 border-primary/20 bg-primary/5 p-4 md:p-8">
                    <h3 className="mb-4 md:mb-6 text-xl md:text-2xl font-semibold text-gray-900">
                        Derechos ARCO
                    </h3>
                    <p className="mb-4 text-sm md:text-base text-gray-700">
                        Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada adecuadamente (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición).
                    </p>
                    <div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-2">
                        {rights.map((right, index) => (
                            <div key={index} className="flex items-start gap-2 md:gap-3 rounded-lg bg-white p-3 md:p-4">
                                <div className="mt-1 text-lg md:text-xl text-secondary flex-shrink-0">✓</div>
                                <p className="text-sm md:text-base text-gray-700">{right}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 md:mt-6 rounded-lg bg-white p-4 md:p-6">
                        <p className="mb-2 text-sm md:text-base font-semibold text-gray-900">Para ejercer sus derechos ARCO, puede enviar una solicitud a:</p>
                        <p className="text-sm md:text-base text-gray-700">
                            <strong>Correo electrónico:</strong> <a href="mailto:rubendarioh98@gmail.com" className="text-primary hover:underline break-all">rubendarioh98@gmail.com</a>
                        </p>
                        <p className="mt-2 text-xs md:text-sm text-gray-600">
                            Su solicitud deberá contener: nombre completo, domicilio, identificación oficial, descripción clara de los datos sobre los que busca ejercer sus derechos, y cualquier documento que facilite la localización de sus datos.
                        </p>
                    </div>
                </div>

                {/* Additional Information */}
                <div className="mt-8 md:mt-12 space-y-4 md:space-y-6">
                    <div className="rounded-lg bg-white p-4 md:p-6 shadow-sm">
                        <h4 className="mb-2 md:mb-3 text-lg md:text-xl font-semibold text-gray-900">Transferencia de Datos</h4>
                        <p className="text-sm md:text-base text-gray-700">
                            Sus datos personales NO serán transferidos a terceros, salvo en los casos previstos por la Ley. En caso de requerir transferir sus datos para finalidades distintas, se solicitará su consentimiento expreso.
                        </p>
                    </div>

                    <div className="rounded-lg bg-white p-4 md:p-6 shadow-sm">
                        <h4 className="mb-2 md:mb-3 text-lg md:text-xl font-semibold text-gray-900">Seguridad de los Datos</h4>
                        <p className="text-sm md:text-base text-gray-700">
                            Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger sus datos personales contra daño, pérdida, alteración, destrucción o uso no autorizado. El procesamiento de imágenes faciales se realiza mediante tecnologías de encriptación y los datos biométricos se procesan localmente en el dispositivo siempre que sea posible.
                        </p>
                    </div>

                    <div className="rounded-lg bg-white p-4 md:p-6 shadow-sm">
                        <h4 className="mb-2 md:mb-3 text-lg md:text-xl font-semibold text-gray-900">Cookies y Tecnologías de Rastreo</h4>
                        <p className="text-sm md:text-base text-gray-700">
                            APRENDIA Emotion AI utiliza cookies y tecnologías similares para mejorar la experiencia del usuario, recordar preferencias y analizar el uso de la plataforma. Puede configurar su navegador para rechazar cookies, aunque esto podría afectar la funcionalidad del servicio.
                        </p>
                    </div>

                    <div className="rounded-lg bg-white p-4 md:p-6 shadow-sm">
                        <h4 className="mb-2 md:mb-3 text-lg md:text-xl font-semibold text-gray-900">Cambios al Aviso de Privacidad</h4>
                        <p className="text-sm md:text-base text-gray-700">
                            Nos reservamos el derecho de modificar el presente Aviso de Privacidad en cualquier momento. Cualquier cambio será comunicado a través de nuestra plataforma web y/o correo electrónico registrado.
                        </p>
                    </div>

                    <div className="rounded-lg bg-white p-4 md:p-6 shadow-sm">
                        <h4 className="mb-2 md:mb-3 text-lg md:text-xl font-semibold text-gray-900">Consentimiento</h4>
                        <p className="text-sm md:text-base text-gray-700">
                            Al utilizar APRENDIA Emotion AI y proporcionar sus datos personales, usted consiente tácitamente el tratamiento de los mismos conforme a los términos y condiciones del presente Aviso de Privacidad. Para el tratamiento de datos sensibles (imágenes faciales), se solicitará su consentimiento expreso antes de activar la funcionalidad de análisis emocional.
                        </p>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="mt-8 md:mt-12 border-t border-gray-300 pt-6 md:pt-8 text-center">
                    <p className="text-xs md:text-sm text-gray-600">
                        Este Aviso de Privacidad cumple con los requisitos establecidos por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y su Reglamento.
                    </p>
                    <p className="mt-2 text-xs md:text-sm text-gray-500">
                        Para más información, puede consultar el portal del Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI) en{" "}
                        <a href="https://home.inai.org.mx" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
                            www.inai.org.mx
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
};