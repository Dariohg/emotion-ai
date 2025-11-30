export const HowItWorks = () => {
    return (
        <section className="bg-white py-24">
            <div className="container mx-auto max-w-7xl px-6">
                <h2 className="mb-16 text-center text-3xl font-bold text-gray-900 md:text-4xl">
                    ¿Cómo se integra en otras apps?
                </h2>
                <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-8">

                    <div className="flex-1 text-center">
                        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-2xl font-bold text-white">1</div>
                        <h3 className="mb-2 text-xl font-semibold">Como una Pieza Adicional</h3>
                        <p className="text-gray-600">Nuestra IA se entrega como un "paquete" o "componente" listo para usar. La app principal (APRENDIA) solo tiene que añadirlo, como quien añade una nueva función a su teléfono.</p>
                    </div>

                    <div className="hidden md:block h-12 w-px border-l-2 border-dashed border-secondary md:h-auto md:w-auto md:flex-1 md:border-l-0 md:border-t-2 md:mt-7"></div>

                    <div className="flex-1 text-center">
                        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-2xl font-bold text-white">2</div>
                        <h3 className="mb-2 text-xl font-semibold">Un Asistente en Pantalla</h3>
                        <p className="text-gray-600">La app principal coloca a nuestro "asistente" en las pantallas de las lecciones. Este asistente se encarga de activar la cámara y hacer todo el trabajo de análisis en segundo plano.</p>
                    </div>

                    <div className="hidden md:block h-12 w-px border-l-2 border-dashed border-secondary md:h-auto md:w-auto md:flex-1 md:border-l-0 md:border-t-2 md:mt-7"></div>

                    <div className="flex-1 text-center">
                        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-2xl font-bold text-white">3</div>
                        <h3 className="mb-2 text-xl font-semibold">Envía Alertas de Ayuda</h3>
                        <p className="text-gray-600">Cuando nuestro asistente detecta "confusión", le avisa a la app principal. La app decide en ese momento mostrar un video de ayuda, un consejo o un refuerzo.</p>
                    </div>

                </div>
            </div>
        </section>
    );
};