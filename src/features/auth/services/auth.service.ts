import {api} from "@/src/lib/axios";

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

export const authService = {
    // Paso 1: Solicitar el código OTP
    requestLogin: async (email: string) => {
        const { data } = await api.post<LoginResponse>('/auth/companies/login', { email });
        return data;
    },

    // Paso 2: Verificar el código y obtener el Token
    verifyLogin: async (email: string, otp_code: string) => {
        const { data } = await api.post<VerifyResponse>('/auth/companies/verify-login', {
            email,
            otp_code
        });

        // Guardar sesión automáticamente
        if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('company_data', JSON.stringify(data.company));
        }

        return data;
    }
};