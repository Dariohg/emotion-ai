import { Navbar } from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/layout/Footer";
import { TermsContent } from "@/src/features/terms/components/TermsContent";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <TermsContent />
            </main>
            <Footer />
        </div>
    );
}