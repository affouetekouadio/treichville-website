import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { usePage } from '@inertiajs/react';

/**
 * Types de notifications disponibles
 */
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

/**
 * Structure d'une notification
 */
export interface Notification {
    id: string;
    type: NotificationType;
    message: string;
    duration?: number; // Durée en millisecondes avant disparition automatique
}

/**
 * Interface du contexte de notification
 */
interface NotificationContextType {
    notifications: Notification[];
    addNotification: (type: NotificationType, message: string, duration?: number) => void;
    removeNotification: (id: string) => void;
    clearAll: () => void;
}

/**
 * Contexte de notification
 * Permet de gérer l'affichage des notifications dans toute l'application
 */
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

/**
 * Provider de notifications
 * Doit envelopper les composants qui utilisent les notifications
 */
export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const { props } = usePage();

    /**
     * Ajoute une nouvelle notification
     * @param type - Type de notification (success, error, warning, info)
     * @param message - Message à afficher
     * @param duration - Durée d'affichage en ms (par défaut: 5000ms)
     */
    const addNotification = useCallback((
        type: NotificationType,
        message: string,
        duration: number = 5000
    ) => {
        // Génère un ID unique pour la notification
        const id = `${Date.now()}-${Math.random()}`;

        const notification: Notification = {
            id,
            type,
            message,
            duration,
        };

        setNotifications((prev) => [...prev, notification]);

        // Supprime automatiquement la notification après la durée spécifiée
        if (duration > 0) {
            setTimeout(() => {
                removeNotification(id);
            }, duration);
        }
    }, []);

    /**
     * Supprime une notification spécifique
     * @param id - ID de la notification à supprimer
     */
    const removeNotification = useCallback((id: string) => {
        setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, []);

    /**
     * Supprime toutes les notifications
     */
    const clearAll = useCallback(() => {
        setNotifications([]);
    }, []);

    /**
     * Effet pour gérer les messages flash de Laravel
     * Détecte automatiquement les messages success/error dans les props Inertia
     */
    useEffect(() => {
        // Gestion du message de succès
        if (props.flash?.success) {
            addNotification('success', props.flash.success as string);
        }

        // Gestion du message d'erreur
        if (props.flash?.error) {
            addNotification('error', props.flash.error as string);
        }

        // Gestion du message d'avertissement
        if (props.flash?.warning) {
            addNotification('warning', props.flash.warning as string);
        }

        // Gestion du message d'information
        if (props.flash?.info) {
            addNotification('info', props.flash.info as string);
        }
    }, [props.flash, addNotification]);

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                addNotification,
                removeNotification,
                clearAll,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

/**
 * Hook personnalisé pour utiliser le contexte de notification
 * @throws Erreur si utilisé en dehors du NotificationProvider
 * @returns Les fonctions et données du contexte de notification
 *
 * @example
 * ```tsx
 * const { addNotification } = useNotification();
 *
 * // Afficher une notification de succès
 * addNotification('success', 'Opération réussie !');
 *
 * // Afficher une notification d'erreur
 * addNotification('error', 'Une erreur est survenue');
 * ```
 */
export function useNotification() {
    const context = useContext(NotificationContext);

    if (context === undefined) {
        throw new Error('useNotification doit être utilisé à l\'intérieur d\'un NotificationProvider');
    }

    return context;
}
