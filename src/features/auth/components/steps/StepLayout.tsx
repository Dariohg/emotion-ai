import { ReactNode } from "react";

interface StepLayoutProps {
    title: string;
    subtitle: string | ReactNode;
    children: ReactNode;
    isActive: boolean;
    isCompleted: boolean;
}

export const StepLayout = ({ title, subtitle, children, isActive, isCompleted }: StepLayoutProps) => {
    return (
        <div className={`w-full ${!isActive ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
                {/* Usar subtitle en lugar de description/subtitle string */}
                <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
            </div>
            {children}
        </div>
    );
};