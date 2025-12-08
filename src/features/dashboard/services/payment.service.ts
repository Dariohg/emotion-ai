import { api } from "@/src/lib/axios";

export interface CreatePaymentResponse {
    payment_url: string;
}

export const paymentService = {
    createPaymentLink: async (companyId: string, applicationId: string) => {
        let email = "";

        if (typeof window !== 'undefined') {
            const companyDataStr = localStorage.getItem('company_data');
            if (companyDataStr) {
                try {
                    const companyData = JSON.parse(companyDataStr);
                    email = companyData.email;
                } catch (e) {
                    console.error("Error parseando company_data", e);
                }
            }
        }

        console.log("[PaymentService] Iniciando pago para:", email);

        if (!email) {
            throw new Error("No se encontró el email de la empresa");
        }

        const baseUrl = "https://salvably-unsaponified-blair.ngrok-free.dev"

        const payload = {
            application_id: applicationId,
            success_url: `${baseUrl}/payment/success`,
            cancel_url: `${baseUrl}/dashboard`
        };

        try {
            // Hacemos la petición y guardamos la respuesta completa
            const response = await api.post<CreatePaymentResponse>('/payments/create-link', payload, {
                headers: {
                    'X-Company-ID': companyId,
                    'X-User-Email': email
                }
            });

            console.log("[PaymentService] Respuesta completa de Axios:", response);

            if (!response.data) {
                throw new Error("El servidor respondió sin datos");
            }

            return response.data;

        } catch (error: any) {
            console.error("[PaymentService] Error en la petición:", error.response?.data || error.message);
            throw error;
        }
    }
};