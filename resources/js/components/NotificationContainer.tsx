import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { useNotification, type NotificationType } from '@/contexts/NotificationContext';

/**
 * Configuration des icônes et couleurs par type de notification
 */
const notificationConfig: Record<
    NotificationType,
    {
        icon: typeof CheckCircle;
        bgColor: string;
        borderColor: string;
        iconColor: string;
        progressColor: string;
    }
> = {
    success: {
        icon: CheckCircle,
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        iconColor: 'text-green-600',
        progressColor: 'bg-green-500',
    },
    error: {
        icon: XCircle,
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        iconColor: 'text-red-600',
        progressColor: 'bg-red-500',
    },
    warning: {
        icon: AlertTriangle,
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        iconColor: 'text-orange-600',
        progressColor: 'bg-orange-500',
    },
    info: {
        icon: Info,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        iconColor: 'text-blue-600',
        progressColor: 'bg-blue-500',
    },
};

/**
 * Composant d'une notification individuelle
 */
function NotificationItem({
    id,
    type,
    message,
    duration = 5000,
}: {
    id: string;
    type: NotificationType;
    message: string;
    duration?: number;
}) {
    const { removeNotification } = useNotification();
    const config = notificationConfig[type];
    const Icon = config.icon;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`relative flex items-start gap-3 p-4 rounded-lg border shadow-lg ${config.bgColor} ${config.borderColor} min-w-[320px] max-w-md overflow-hidden`}
        >
            {/* Icône du type de notification */}
            <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />

            {/* Message de la notification */}
            <div className="flex-1 text-sm text-gray-800 font-medium pr-2">
                {message}
            </div>

            {/* Bouton de fermeture */}
            <button
                onClick={() => removeNotification(id)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Fermer la notification"
            >
                <X className="w-4 h-4" />
            </button>

            {/* Barre de progression pour l'auto-disparition */}
            {duration > 0 && (
                <motion.div
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: duration / 1000, ease: 'linear' }}
                    className={`absolute bottom-0 left-0 h-1 ${config.progressColor}`}
                />
            )}
        </motion.div>
    );
}

/**
 * Conteneur principal des notifications
 * Affiche toutes les notifications actives dans un coin de l'écran
 *
 * @example
 * ```tsx
 * // Dans votre layout
 * <NotificationProvider>
 *   <NotificationContainer />
 *   {children}
 * </NotificationProvider>
 * ```
 */
export default function NotificationContainer() {
    const { notifications } = useNotification();

    return (
        <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
            <AnimatePresence mode="popLayout">
                {notifications.map((notification) => (
                    <div key={notification.id} className="pointer-events-auto">
                        <NotificationItem
                            id={notification.id}
                            type={notification.type}
                            message={notification.message}
                            duration={notification.duration}
                        />
                    </div>
                ))}
            </AnimatePresence>
        </div>
    );
}
