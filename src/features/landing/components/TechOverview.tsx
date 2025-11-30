import Image from 'next/image';

export const TechOverview = () => {
    return (
        <section id="tecnologia" className="bg-white py-24">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
                    <div>
                        <Image
                            src="/face_mesh_overview.png"
                            alt="Malla facial de 468 puntos"
                            width={600}
                            height={600}
                            className="w-full rounded-lg shadow-xl"
                        />
                    </div>
                    <div className="text-left">
                        <span className="font-semibold uppercase tracking-wider text-secondary">
                            Arquitectura y Tecnología
                        </span>
                        <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
                            Una Integración No Invasiva
                        </h2>
                        <p className="mt-6 text-lg text-gray-600">
                            Diseñamos el agente como una librería simple. Esto soluciona un problema clave: en lugar de forzar al usuario a usar dos apps, <strong className="font-semibold text-gray-800">todo se mantiene en la aplicación principal</strong> (APRENDIA).
                        </p>
                        <p className="mt-4 text-lg text-gray-600">
                            Este enfoque evita que nuestra app se ejecute en segundo plano y permite una integración limpia como un simple "widget" más.
                        </p>

                        <h3 className="mt-8 text-2xl font-bold text-gray-900">
                            ¿Cómo funciona?
                        </h3>
                        <p className="mt-4 text-lg text-gray-600">
                            Utilizamos tecnología de aprendizaje automático (ML Kit) para capturar una <strong className="font-semibold text-gray-800">malla facial de 468 puntos</strong> en tiempo real. Es al analizar los movimientos sutiles de estos puntos que nuestro sistema interpreta las expresiones no verbales con alta precisión.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};