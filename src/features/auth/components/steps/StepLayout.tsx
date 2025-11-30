'use client';

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StepLayoutProps {
    isActive: boolean;
    isCompleted: boolean;
    children: React.ReactNode;
    title: string;
    description?: React.ReactNode;
    onEdit?: () => void;
}

export const StepLayout = ({ isActive, isCompleted, children, title, description, onEdit }: StepLayoutProps) => {
    return (
        <motion.div
            initial={false}
            animate={{
                opacity: isActive ? 1 : 0.5, // Opacidad reducida si ya pasó
                y: 0,
                pointerEvents: isActive ? 'auto' : 'none', // Deshabilita clicks si no está activo
                filter: isCompleted ? 'grayscale(100%)' : 'none' // Efecto visual opcional para lo "viejo"
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={cn(
                "w-full relative py-2 transition-colors",
                // Si no está activo ni completado (pasos futuros), lo ocultamos
                !isActive && !isCompleted ? "hidden" : "block"
            )}
        >
            <div className="relative pl-6">

                {/* Línea lateral decorativa (Timeline) */}
                <div className={cn("absolute left-0 top-2 bottom-0 w-0.5 transition-colors duration-500",
                    isCompleted ? "bg-green-500" : isActive ? "bg-black" : "bg-gray-100"
                )} />

                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className={cn("text-2xl font-bold tracking-tight transition-colors",
                            isCompleted ? "text-gray-500" : "text-gray-900"
                        )}>
                            {title}
                        </h2>
                        {description && isActive && (
                            <div className="mt-1 text-sm text-gray-500">
                                {description}
                            </div>
                        )}
                    </div>

                    {/* Botón Editar (Solo aparece si está completado) */}
                    {isCompleted && onEdit && (
                        <button
                            onClick={onEdit}
                            className="text-sm font-medium text-primary hover:text-primary/80 hover:underline pointer-events-auto px-2 py-1"
                        >
                            Editar
                        </button>
                    )}
                </div>

                {/* Contenido del paso */}
                <div className="relative">
                    {children}
                </div>
            </div>
        </motion.div>
    );
};