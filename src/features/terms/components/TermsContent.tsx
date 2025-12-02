'use client';

import { IoShieldCheckmarkOutline, IoLockClosedOutline, IoPersonOutline, IoDocumentTextOutline, IoAlertCircleOutline } from "react-icons/io5";

export const TermsContent = () => {
    // Definimos las secciones principales para mantener el código limpio
    const sections = [
        {
            id: "responsable",
            icon: <IoPersonOutline className="h-6 w-6" />,
            title: "1. Responsable del Tratamiento",
            content: (
                <>
                    <p className="leading-relaxed text-slate-600 mb-4">
                        La <strong>Universidad Politécnica de Chiapas</strong>, con domicilio en Carretera Tuxtla Gutiérrez - Portillo Zaragoza Km 21+500, Las Brisas, 29150 Suchiapa, Chiapas, es la entidad responsable del tratamiento de sus datos personales.
                    </p>
                    <p className="leading-relaxed text-slate-600">
                        Sus datos serán protegidos conforme a lo dispuesto por la <em>Ley Federal de Protección de Datos Personales en Posesión de los Particulares</em> y demás normatividad aplicable.
                    </p>
                </>
            )
        },
        {
            id: "datos",
            icon: <IoDocumentTextOutline className="h-6 w-6" />,
            title: "2. Datos Personales Recabados",
            content: (
                <>
                    <p className="leading-relaxed text-slate-600 mb-4">
                        Para la operación efectiva de APRENDIA Emotion AI, recabamos las siguientes categorías de datos:
                    </p>
                    <ul className="space-y-3 ml-4">
                        <li className="flex items-start text-slate-600">
                            <span className="mr-3 mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 flex-shrink-0"></span>
                            <span>
                                <strong className="text-slate-900">Datos de Identificación:</strong> Nombre completo, correo electrónico institucional o personal.
                            </span>
                        </li>
                        <li className="flex items-start text-slate-600">
                            <span className="mr-3 mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 flex-shrink-0"></span>
                            <span>
                                <strong className="text-slate-900">Datos de Uso:</strong> Tiempo de sesión, progreso en lecciones, frecuencia de interacciones.
                            </span>
                        </li>
                        <li className="flex items-start text-slate-600">
                            <span className="mr-3 mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 flex-shrink-0"></span>
                            <span>
                                <strong className="text-slate-900">Datos Biométricos (Sensibles):</strong> Patrones faciales capturados en tiempo real para el análisis de emociones (confusión, interés, frustración). <em className="text-slate-500">Estos datos no se almacenan permanentemente.</em>
                            </span>
                        </li>
                    </ul>
                </>
            )
        },
        {
            id: "finalidades",
            icon: <IoShieldCheckmarkOutline className="h-6 w-6" />,
            title: "3. Finalidades del Tratamiento",
            content: (
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 border-b border-slate-200 pb-2">
                            Finalidades Primarias (Necesarias)
                        </h4>
                        <ul className="space-y-2 text-slate-600 text-sm">
                            <li>• Detección de emociones en tiempo real.</li>
                            <li>• Generación de retroalimentación visual adaptativa.</li>
                            <li>• Creación de métricas de progreso pedagógico.</li>
                            <li>• Autenticación y gestión de cuenta.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 border-b border-slate-200 pb-2">
                            Finalidades Secundarias (Opcionales)
                        </h4>
                        <ul className="space-y-2 text-slate-600 text-sm">
                            <li>• Estudios estadísticos de investigación educativa.</li>
                            <li>• Mejora de algoritmos de reconocimiento.</li>
                            <li>• Envío de novedades sobre la plataforma.</li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            id: "proteccion",
            icon: <IoLockClosedOutline className="h-6 w-6" />,
            title: "4. Protección de Datos Sensibles",
            content: (
                <div className="bg-indigo-50 border-l-4 border-indigo-500 p-5 rounded-r-lg">
                    <p className="text-indigo-900 text-sm leading-relaxed">
                        <strong>IMPORTANTE:</strong> Los datos biométricos son procesados localmente o en memoria volátil. No almacenamos fotografías ni videos de los usuarios en nuestros servidores. Solo conservamos los metadatos resultantes del análisis (ej: "Nivel de atención: Alto") de forma disociada.
                    </p>
                </div>
            )
        }
    ];

    return (
        <section className="bg-white py-20">
            <div className="container mx-auto max-w-4xl px-6">

                {/* Header del Documento */}
                <div className="mb-16 text-center">
                    <div className="inline-flex items-center justify-center p-2 bg-indigo-50 rounded-full mb-4">
                        <IoAlertCircleOutline className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                        Aviso de Privacidad Integral
                    </h1>
                    <p className="text-slate-500 text-lg">
                        Última actualización: Enero 2025
                    </p>
                </div>

                {/* Contenido Legal */}
                <div className="space-y-12">
                    {sections.map((section) => (
                        <div key={section.id} className="scroll-mt-24" id={section.id}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="text-indigo-600 p-1.5 bg-indigo-50 rounded-lg">
                                    {section.icon}
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                                    {section.title}
                                </h2>
                            </div>

                            <div className="text-base text-slate-600 pl-0 md:pl-11">
                                {section.content}
                            </div>

                            {/* Separador sutil entre secciones */}
                            <div className="h-px bg-slate-100 mt-12 w-full" />
                        </div>
                    ))}

                    {/* Sección Derechos ARCO (Diseño especial) */}
                    <div className="pt-4">
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
                            5. Derechos ARCO
                        </h2>
                        <p className="text-slate-600 mb-6">
                            Usted tiene derecho a conocer, rectificar, cancelar u oponerse al tratamiento de sus datos (Derechos ARCO). Para ejercerlos, envíe una solicitud a nuestro oficial de privacidad:
                        </p>

                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-1">Contacto Oficial</p>
                                <a href="mailto:rubendarioh98@gmail.com" className="text-lg font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                                    rubendarioh98@gmail.com
                                </a>
                            </div>
                            <div className="text-xs text-slate-500 max-w-xs text-center md:text-right">
                                Responderemos a su solicitud en un plazo máximo de 20 días hábiles conforme a la ley.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Legal */}
                <div className="mt-20 pt-8 border-t border-slate-200 text-center">
                    <p className="text-xs text-slate-400 leading-relaxed max-w-2xl mx-auto">
                        Este documento se rige por las leyes de los Estados Unidos Mexicanos. Al utilizar nuestra plataforma, usted acepta los términos descritos. Para más información sobre sus derechos, visite el sitio oficial del <a href="https://home.inai.org.mx" target="_blank" rel="noreferrer" className="underline hover:text-indigo-600">INAI</a>.
                    </p>
                </div>

            </div>
        </section>
    );
};