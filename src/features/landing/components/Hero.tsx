import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaPlay } from 'react-icons/fa';
import { Button } from '@/src/components/ui/button';

export const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-white">

            {/* Gradient Background Blobs Sutiles - Usando colores estándar */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none opacity-40">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-3xl animate-blob" />
                <div className="absolute top-[10%] right-[-10%] w-[400px] h-[400px] bg-violet-100/50 rounded-full blur-3xl animate-blob animation-delay-2000" />
            </div>

            <div className="container relative z-10 mx-auto max-w-6xl px-6">
                <div className="flex flex-col items-center text-center">

                    {/* Badge */}
                    <div className="mb-8 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 backdrop-blur-sm">
                        <span className="mr-2 flex h-2 w-2">
                            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
                        </span>
                        Revolucionando la educación digital
                    </div>

                    {/* Headline */}
                    <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
                        La IA que entiende el <br className="hidden md:block" />
                        aprendizaje <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">no verbal</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed">
                        Detecta confusión, interés o frustración en tiempo real leyendo expresiones faciales.
                        Una herramienta ética diseñada para potenciar la conexión humana en entornos virtuales.
                    </p>

                    {/* Botones CORREGIDOS - Usando colores estándar de Tailwind */}
                    <div className="mt-10 flex flex-col gap-4 sm:flex-row justify-center w-full sm:w-auto">
                        <Link href="/register" className="w-full sm:w-auto">
                            {/* CAMBIO CLAVE: bg-indigo-600 en lugar de bg-primary-600 */}
                            <Button className="w-full sm:w-auto h-12 px-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 border-0">
                                Empezar Ahora <FaArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>

                        <Link href="#demo" className="w-full sm:w-auto">
                            {/* Este botón ya debería verse bien, aseguramos el texto oscuro */}
                            <Button variant="outline" className="w-full sm:w-auto h-12 px-8 rounded-full border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium">
                                <FaPlay className="mr-2 h-3 w-3 text-slate-400" /> Ver Demo
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Dashboard Preview Image */}
                <div className="mt-20 relative">
                    <div className="group relative rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-200/50">
                        <div className="aspect-[16/9] overflow-hidden rounded-xl bg-slate-50 relative">
                            <Image
                                src="/banner.png"
                                alt="Dashboard Emotion AI"
                                fill
                                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.01]"
                                priority
                            />
                            <div className="absolute inset-0 ring-1 ring-inset ring-slate-900/5 rounded-xl"></div>
                        </div>
                    </div>

                    <div className="absolute -inset-4 -z-10 bg-gradient-to-r from-indigo-100 to-violet-100 rounded-3xl blur-2xl opacity-50"></div>
                </div>
            </div>
        </section>
    );
};