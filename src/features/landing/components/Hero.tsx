import Image from 'next/image';

export const Hero = () => {
    return (
        <section className="bg-gray-50">
            <div className="container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-12 md:grid-cols-2 md:py-24">
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
                        La IA que entiende el aprendizaje no oral
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 md:text-xl">
                        En el aprendizaje digital, es difícil saber si un alumno está entendiendo o si ya se frustró. Nuestro agente virtual soluciona esto: "lee" expresiones faciales para detectar <strong className="text-primary">confusión, interés o frustración</strong> y ofrece retroalimentación visual al instante.
                    </p>
                    <a
                        href="#cta"
                        className="mt-8 inline-block rounded-lg bg-primary px-8 py-3 text-lg font-medium text-white shadow-lg transition duration-300 hover:bg-primary/80 hover:shadow-primary/30 focus:outline-none focus:ring-4 focus:ring-primary/50"
                    >
                        Solicitar Información
                    </a>
                </div>

                <div className="text-center">
                    {/* Asegúrate de que banner.png esté en la carpeta public/ */}
                    <div className="relative w-full max-w-sm mx-auto h-[400px]">
                        <Image
                            src="/banner.png"
                            alt="Demo de APRENDIA Emotion AI en un móvil"
                            fill
                            className="object-contain rounded-lg shadow-xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};