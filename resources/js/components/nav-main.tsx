import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { resolveUrl } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    const renderNavItems = (navItems: NavItem[]) => (
        navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                    asChild
                    isActive={page.url.startsWith(resolveUrl(item.href))}
                    tooltip={{ children: item.title }}
                >
                    {item.href !== '#' ? (
                        <Link href={item.href} prefetch>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                        </Link>
                    ) : (
                        <span>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                        </span>
                    )}
                </SidebarMenuButton>
                {item.children && item.children.length > 0 && (
                    <SidebarMenu className="pl-4">
                        {renderNavItems(item.children)}
                    </SidebarMenu>
                )}
            </SidebarMenuItem>
        ))
    );

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu>
                {renderNavItems(items)}
            </SidebarMenu>
        </SidebarGroup>
    );
}
