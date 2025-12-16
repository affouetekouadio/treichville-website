import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#f8812f] rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#03800a] rounded-full blur-3xl" />
            </div>

            <div className="w-full max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Left Side - Branding */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="hidden lg:flex flex-col justify-center p-12"
                    >
                        <Link
                            href={createPageUrl("Home")}
                            className="inline-flex items-center gap-3 mb-8"
                        >
                            <img
                                src="/images/logo-mairie.png"
                                alt="Mairie de Treichville"
                                className="h-16 w-auto"
                            />
                        </Link>

                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Mairie de Treichville
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed mb-8">
                            Commune dynamique d'Abidjan, au service de ses citoyens pour un développement durable et inclusif.
                        </p>

                        {/* Features */}
                        <div className="space-y-4">
                            {[
                                "Accès sécurisé à vos services",
                                "Gestion simplifiée de vos démarches",
                                "Suivi de vos dossiers en ligne"
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + idx * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-2 h-2 bg-[#f8812f] rounded-full" />
                                    <span className="text-gray-700">{item}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Decorative Element */}
                        <div className="mt-12 relative">
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#03800a]/20 rounded-full blur-2xl" />
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#f8812f]/20 rounded-full blur-2xl" />
                        </div>
                    </motion.div>

                    {/* Right Side - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
                            {/* Mobile Logo */}
                            <div className="lg:hidden flex justify-center mb-8">
                                <Link href={createPageUrl("Home")}>
                                    <img
                                        src="/images/logo-mairie.png"
                                        alt="Mairie de Treichville"
                                        className="h-16 w-auto"
                                    />
                                </Link>
                            </div>

                            {/* Title and Description */}
                            <div className="text-center mb-8">
                                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                                    {title}
                                </h2>
                                <p className="text-gray-600">
                                    {description}
                                </p>
                            </div>

                            {/* Form Content */}
                            <div className="space-y-6">
                                {children}
                            </div>

                            {/* Footer Link */}
                            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                                <Link
                                    href={createPageUrl("Home")}
                                    className="text-sm text-[#03800a] hover:text-[#f8812f] transition-colors font-medium"
                                >
                                    ← Retour à l'accueil
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
