import { api } from "@/src/lib/axios";

export const companyService = {
    // Paso 6: Obtener datos de la empresa
    getCompany: async (companyId: string) => {
        const { data } = await api.get(`/auth/companies/${companyId}`, {
            headers: { 'X-Company-ID': companyId }
        });
        return data;
    },

    // Paso 7: Actualizar empresa
    updateCompany: async (companyId: string, data: { name?: string; is_active?: boolean }) => {
        const { data: response } = await api.put(`/auth/companies/${companyId}`, data, {
            headers: { 'X-Company-ID': companyId }
        });

        // Actualizar datos en localStorage si cambió el nombre
        if (typeof window !== 'undefined') {
            const current = JSON.parse(localStorage.getItem('company_data') || '{}');
            localStorage.setItem('company_data', JSON.stringify({ ...current, ...response }));
        }

        return response;
    }
};