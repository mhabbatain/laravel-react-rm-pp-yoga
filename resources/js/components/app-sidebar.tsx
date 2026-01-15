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
import { beranda } from '@/routes';
import daftarMenu from '@/routes/daftar-menu';
import daftarPesanan from '@/routes/daftar-pesanan';
import karyawan from '@/routes/karyawan';
import pos from '@/routes/pos';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
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
        isAdminOnly: true,
    },
    {
        title: 'POS',
        href: pos.index(),
        icon: Store,
        isAdminOnly: false,
    },
    {
        title: 'Daftar Pesanan',
        href: daftarPesanan.index(),
        icon: FileText,
        isAdminOnly: true,
    },
    {
        title: 'Karyawan',
        href: karyawan.index(),
        icon: UsersRound,
        isAdminOnly: true,
    },
    {
        title: 'Daftar Menu',
        href: daftarMenu.index(),
        icon: Utensils,
        isAdminOnly: false,
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
    const { props } = usePage<SharedData>(); // Use GlobalSharedProps
    const userRole = props.auth.user?.role;

    // Filter navigation items based on user role
    const visibleNavItems = mainNavItems.filter((item) => {
        // Admin sees everything
        if (userRole === 'admin') return true;

        // Karyawan should only see POS and Daftar Pesanan (detail)
        if (userRole === 'karyawan') {
            return item.title === 'POS' || item.title === 'Daftar Pesanan';
        }

        // Default: hide
        return false;
    });
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
                <NavMain items={visibleNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
