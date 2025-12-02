import { Navbar } from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/layout/Footer";
import { ManualContent } from "@/src/features/manual/components/ManualContent";

export default function ManualPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="pt-20">
                <ManualContent />
            </main>

            <Footer />
        </div>
    );
}