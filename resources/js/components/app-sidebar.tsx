import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, CalendarDays, Folder, Images, LayoutGrid, Mail, MapPin, Megaphone, PanelsTopLeft, Presentation, Settings, Tag, Users, Network } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Slides',
        href: '/admin/slides',
        icon: Presentation,
    },
    {
        title: 'Journal',
        href: '/admin/journal',
        icon: BookOpen,
    },
    {
        title: 'Actualités',
        href: '/admin/actualites',
        icon: Megaphone,
    },
    {
        title: 'Événements',
        href: '/admin/evenements',
        icon: CalendarDays,
    },
    {
        title: 'Médias',
        href: '/admin/media',
        icon: Images,
    },
    {
        title: 'Blocs de contenu',
        href: '/admin/content-blocks',
        icon: PanelsTopLeft,
    },
    {
        title: 'Catégories',
        href: '/admin/categories',
        icon: Tag,
    },
    {
        title: 'Contacts',
        href: '/admin/contacts',
        icon: Mail,
    },
    {
        title: 'Adjoints',
        href: '/admin/adjoints',
        icon: Users,
    },
    {
        title: 'Directions',
        href: '/admin/directions',
        icon: Network,
    },
    {
        title: 'Lieux',
        href: '/admin/lieux',
        icon: MapPin,
    },
    {
        title: 'Paramètres',
        href: '/admin/settings',
        icon: Settings,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
