import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-200 py-12">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Copyright */}
                    <div className="text-slate-500 text-sm text-center md:text-left">
                        <p>© 2025 <strong className="font-semibold text-slate-700">Universidad Politécnica de Chiapas</strong>.</p>
                        <p className="mt-1">Todos los derechos reservados.</p>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-8">
                        <Link href="/terms" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                            Términos y Privacidad
                        </Link>
                        <Link href="/docs" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                            Documentación
                        </Link>
                    </div>

                    {/* Socials (Opcional) */}
                    <div className="flex gap-4">
                        <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                            <FaGithub className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                            <FaLinkedin className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};