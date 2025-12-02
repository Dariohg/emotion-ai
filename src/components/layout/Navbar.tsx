'use client';

import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Importamos useRouter
import { Button } from '@/src/components/ui/button';
import {BookOpen} from "lucide-react";

const navLinks = [
    { title: "Beneficios", href: "/#beneficios" },
    { title: "Características", href: "/#caracteristicas" },
    { title: "Tecnología", href: "/#tecnologia" },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const router = useRouter(); // Hook para redirigir

    // Detectamos si estamos dentro del área autenticada (dashboard)
    const isDashboard = pathname.startsWith('/dashboard');
    const isHomePage = pathname === '/';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Función para cerrar sesión
    const handleLogout = () => {
        // 1. Borrar todo del localStorage
        if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('company_data');
        }
        // 2. Redirigir a la landing page
        router.push('/');
    };

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-200 ${
                scrolled || isDashboard ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-white/0 backdrop-blur-sm'
            }`}
        >
            <div className="container mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <span className="text-2xl font-bold tracking-tight text-slate-900">
                        Emotion<span className="text-indigo-600">-AI</span>
                    </span>
                </Link>

                {/* Desktop Navigation (Solo en Home) */}
                {isHomePage && (
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.title}
                                href={link.href}
                                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                            >
                                {link.title}
                            </Link>
                        ))}
                    </nav>
                )}

                {/* Botones de Acción (Desktop) */}
                <div className="hidden md:flex items-center gap-4">
                    {isDashboard || pathname.startsWith('/manual') ? ( // <-- Modificación aquí para que se vea también en /manual
                        <>
                            {/* Nuevo Botón de Documentación */}
                            <Link href="/manual">
                                <Button variant="ghost" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    Documentación
                                </Button>
                            </Link>

                            {/* Botón de Ir al Dashboard (si estamos en manual) */}
                            {!isDashboard && (
                                <Link href="/dashboard">
                                    <Button variant="ghost" className="text-sm font-medium text-slate-600">
                                        Dashboard
                                    </Button>
                                </Link>
                            )}

                            <Button
                                variant="ghost"
                                onClick={handleLogout}
                                className="text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50"
                            >
                                <FaSignOutAlt className="mr-2 h-4 w-4" /> Cerrar Sesión
                            </Button>
                        </>
                    ) : (
                        // Si estamos fuera -> Mostrar Login/Register
                        <>
                            <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
                                Iniciar Sesión
                            </Link>
                            <Link href="/register">
                                <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5 shadow-md">
                                    Registrarse
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-700">
                        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-slate-100 p-4 shadow-xl md:hidden flex flex-col gap-4 animate-in slide-in-from-top-2">
                    {isHomePage && navLinks.map((link) => (
                        <Link
                            key={link.title}
                            href={link.href}
                            className="block py-2 text-base font-medium text-slate-600 hover:text-indigo-600"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.title}
                        </Link>
                    ))}

                    <div className="h-px bg-slate-100 my-2" />

                    {isDashboard ? (
                        <Button
                            variant="ghost"
                            onClick={() => { handleLogout(); setIsOpen(false); }}
                            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                            <FaSignOutAlt className="mr-2 h-4 w-4" /> Cerrar Sesión
                        </Button>
                    ) : (
                        <>
                            <Link href="/login" onClick={() => setIsOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start text-slate-600">Iniciar Sesión</Button>
                            </Link>
                            <Link href="/register" onClick={() => setIsOpen(false)}>
                                <Button className="w-full bg-indigo-600 text-white">Registrarse</Button>
                            </Link>
                        </>
                    )}
                </div>
            )}
        </header>
    );
};