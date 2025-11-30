import {Navbar} from "@/src/components/layout/Navbar";
import {Hero} from "@/src/features/landing/components/Hero";
import {AnimatedSection} from "@/src/components/ui/AnimatedSection";
import {Benefits} from "@/src/features/landing/components/Benefits";
import {KeyFeatures} from "@/src/features/landing/components/KeyFeatures";
import {HowItWorks} from "@/src/features/landing/components/HowItWorks";
import {TechOverview} from "@/src/features/landing/components/TechOverview";
import {Comparison} from "@/src/features/landing/components/Comparison";
import {Trust} from "@/src/features/landing/components/Trust";
import {CTA} from "@/src/features/landing/components/CTA";
import {Footer} from "@/src/components/layout/Footer";


export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main>
                <Hero />

                <AnimatedSection>
                    <Benefits />
                </AnimatedSection>

                <AnimatedSection>
                    <KeyFeatures />
                </AnimatedSection>

                <AnimatedSection>
                    <HowItWorks />
                </AnimatedSection>

                <AnimatedSection>
                    <TechOverview />
                </AnimatedSection>

                <AnimatedSection>
                    <Comparison />
                </AnimatedSection>

                <AnimatedSection>
                    <Trust />
                </AnimatedSection>

                <AnimatedSection>
                    <CTA />
                </AnimatedSection>
            </main>

            <Footer />
        </div>
    );
}