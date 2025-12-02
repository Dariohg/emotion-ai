import { api } from "@/src/lib/axios";

export interface LoginResponse {
    message: string;
    expires_in: number;
}

export interface VerifyResponse {
    token: string;
    company: {
        id: string;
        name: string;
        email: string;
    };
}

export interface GenericResponse {
    message: string;
}

export const authService = {
    // --- FLUJO DE REGISTRO (Tus pasos 1 y 2) ---

    // Paso 1: Solicitar verificación (Manda el código al correo)
    // URL: http://localhost:3000/auth/companies/request-verification
    requestEmailVerification: async (name: string, email: string) => {
        const { data } = await api.post<GenericResponse>('/auth/companies/request-verification', {
            name,
            email
        });
        return data;
    },

    // Paso 2: Completar registro (Crea la empresa con el código)
    // URL: http://localhost:3000/auth/companies/register
    registerCompany: async (name: string, email: string, verification_code: string) => {
        const { data } = await api.post<GenericResponse>('/auth/companies/register', {
            name,
            email,
            verification_code
        });
        return data;
    },

    // --- FLUJO DE LOGIN (Tus pasos 3 y 4) ---

    // Paso 3: Solicitar login (OTP)
    requestLogin: async (email: string) => {
        const { data } = await api.post<LoginResponse>('/auth/companies/login', { email });
        return data;
    },

    // Paso 4: Verificar login y obtener Token
    verifyLogin: async (email: string, otp_code: string) => {
        const { data } = await api.post<VerifyResponse>('/auth/companies/verify-login', {
            email,
            otp_code
        });

        if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('company_data', JSON.stringify(data.company));
        }
        return data;
    }
};