import { api } from "@/src/lib/axios";

export interface Application {
    id: string;
    name: string;
    platform: 'mobile' | 'web';
    environment: 'production' | 'staging' | 'development';
    is_active: boolean;
    created_at: string;
}

// Interfaz para las llaves
export interface ApiKeyData {
    id: string;
    key_value?: string; // El backend a veces lo manda enmascarado
    is_active: boolean;
    created_at: string;
    last_used_at?: string;
}

// Interfaz para la respuesta de creación (para evitar el 'any')
export interface CreateAppResponse {
    application: Application;
    api_key: string;
}

export const applicationService = {
    // Listar aplicaciones
    getApplications: async (companyId: string) => {
        const { data } = await api.get('/auth/applications/', {
            headers: { 'X-Company-ID': companyId }
        });
        return data.applications as Application[];
    },

    // Obtener las llaves de una app específica
    getApplicationKeys: async (companyId: string, applicationId: string) => {
        const { data } = await api.get(`/auth/applications/${applicationId}/api-keys`, {
            headers: { 'X-Company-ID': companyId }
        });
        return data.api_keys as ApiKeyData[];
    },

    // Crear aplicación
    createApplication: async (companyId: string, appData: { name: string; platform: string; environment: string }) => {
        // Tipamos el retorno de axios con CreateAppResponse
        const { data } = await api.post<CreateAppResponse>('/auth/applications/', appData, {
            headers: { 'X-Company-ID': companyId }
        });
        return data;
    },

    // Generar nueva API Key
    generateApiKey: async (companyId: string, applicationId: string) => {
        const { data } = await api.post(`/auth/applications/${applicationId}/generate-key`, {}, {
            headers: { 'X-Company-ID': companyId }
        });
        return data.api_key;
    },

    // Solicitar revocación
    requestRevoke: async (apiKeyId: string) => {
        const { data } = await api.post(`/auth/applications/api-keys/${apiKeyId}/request-revoke`);
        return data;
    },

    // Confirmar revocación
    confirmRevoke: async (apiKeyId: string, confirmationCode: string) => {
        const { data } = await api.post(`/auth/applications/api-keys/${apiKeyId}/confirm-revoke`, {
            confirmation_code: confirmationCode
        });
        return data;
    }
};