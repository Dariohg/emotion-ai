import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export const Comparison = () => {
    return (
        <section className="bg-white py-24">
            <div className="container mx-auto max-w-7xl px-6">
                <h2 className="mb-16 text-center text-3xl font-bold text-gray-900 md:text-4xl">
                    ¿Qué nos hace diferentes?
                </h2>
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                                Criterio
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-secondary">
                                APRENDIA Emotion AI
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                                Soluciones Genéricas
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                                Soluciones Terapéuticas
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                        {/* ... (Contenido igual al original, solo copiando filas) ... */}
                        <tr>
                            <td className="px-6 py-4 font-medium text-gray-900">Enfoque Principal</td>
                            <td className="px-6 py-4 text-gray-800"><FaCheckCircle className="mr-2 inline text-secondary" />Alfabetización y Educación Inclusiva</td>
                            <td className="px-6 py-4 text-gray-600"><FaTimesCircle className="mr-2 inline text-gray-400" />Investigación de Mercados</td>
                            <td className="px-6 py-4 text-gray-600"><FaTimesCircle className="mr-2 inline text-gray-400" />Entrenamiento Terapéutico</td>
                        </tr>
                        {/* Puedes añadir el resto de filas aquí igual que en el original */}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};