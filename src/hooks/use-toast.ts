// Implementación simplificada compatible
import { useState, useEffect } from "react"

export const useToast = () => {
    const toast = ({ title, description, variant }: any) => {
        // Aquí podrías usar una librería real como sonner o react-hot-toast
        // Por ahora, usamos un alert nativo si es error, o console.log
        if (variant === 'destructive') {
            console.error(`TOAST ERROR: ${title} - ${description}`);
            alert(`${title}: ${description}`);
        } else {
            console.log(`TOAST INFO: ${title} - ${description}`);
        }
    }
    return { toast }
}