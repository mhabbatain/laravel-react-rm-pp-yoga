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
import { beranda, daftarMenu, daftarPesanan, karyawan, pos } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    FileText,
    LayoutGrid,
    Store,
    UsersRound,
    Utensils,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Beranda',
        href: beranda(),
        icon: LayoutGrid,
    },
    {
        title: 'POS',
        href: pos(),
        icon: Store,
    },
    {
        title: 'Daftar Pesanan',
        href: daftarPesanan(),
        icon: FileText,
    },
    {
        title: 'Karyawan',
        href: karyawan(),
        icon: UsersRound,
    },
    {
        title: 'Daftar Menu',
        href: daftarMenu(),
        icon: Utensils,
    },
];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//     },
// ];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={beranda()} prefetch>
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
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
