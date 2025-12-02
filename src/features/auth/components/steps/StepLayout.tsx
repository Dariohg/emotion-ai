import { ReactNode } from "react";

interface StepLayoutProps {
    title: string;
    subtitle: string;
    children: ReactNode;
}

export const StepLayout = ({ title, subtitle, children }: StepLayoutProps) => {
    return (
        <div className="w-full">
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
                <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
            </div>
            {children}
        </div>
    );
};