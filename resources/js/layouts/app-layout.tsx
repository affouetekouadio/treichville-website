import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import NotificationContainer from '@/components/NotificationContainer';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

/**
 * Layout principal pour l'interface d'administration
 * Intègre le système de notifications pour afficher les messages flash et erreurs
 */
export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <NotificationProvider>
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
        </AppLayoutTemplate>
        {/* Conteneur des notifications - affiche les messages flash du backend */}
        <NotificationContainer />
    </NotificationProvider>
);
