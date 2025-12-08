
import { z } from "zod";

// Patrones comunes de inyección de código (XSS, SQL Injection, etc.)
const injectionPatterns = [
    /<[^>]*>/, // HTML tags
    /javascript:/i, // JS Protocol
    /on\w+\s*=/i, // Event handlers (onclick, onload)
    /(select|drop|insert|delete|update)\s+.*\s+from/i, // SQL básico
    /--/, // Comentarios SQL
    /(\%27)|(\')|(\-\-)|(\%23)|(#)/i // Caracteres comunes de inyección
];

// Helper para sanitización estricta
export const safeString = (message: string = "Entrada inválida o caracteres no permitidos") =>
    z.string({ message: "Este campo es requerido" })
        .min(1, "El campo no puede estar vacío")
        .refine((val) => {
            return !injectionPatterns.some(pattern => pattern.test(val));
        }, { message });

export const loginSchema = z.object({
    email: z.string().email("Correo electrónico inválido"),
    code: z.string().optional()
});

export const registerSchema = z.object({
    name: safeString("El nombre contiene caracteres inválidos")
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(50, "El nombre es muy largo"),
    email: z.string().email("Correo electrónico inválido"),
});

export const otpSchema = z.object({
    code: z.string()
        .length(6, "El código debe tener exactamente 6 dígitos")
        .regex(/^\d+$/, "El código solo debe contener números")
});