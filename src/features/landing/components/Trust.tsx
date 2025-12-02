import Image from 'next/image';

export const Trust = () => {
    return (
        <section className="bg-slate-900 py-24 text-center relative overflow-hidden">
            {/* Fondo con patrón sutil */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4F46E5 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

            <div className="container mx-auto max-w-4xl px-6 relative z-10">
                <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm">
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
                        Investigación Aplicada
                    </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-light text-white leading-relaxed mb-8">
                    "Emotion AI es un proyecto nacido en la <strong className="font-bold text-white">Universidad Politécnica de Chiapas</strong>, enfocado en democratizar herramientas educativas justas."
                </h2>

                <div className="mt-12 flex justify-center opacity-80 hover:opacity-100 transition-opacity">
                    {/* Placeholder para logo de la universidad si lo tienes, si no, texto elegante */}
                    <div className="text-slate-400 text-sm font-medium uppercase tracking-widest">
                        Ingeniería de Software • 2025
                    </div>
                </div>
            </div>
        </section>
    );
};