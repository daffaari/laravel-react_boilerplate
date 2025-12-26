import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { DataTable } from './datatable/data-table';
import { columns } from './datatable/columns';
import { PageProps } from '@inertiajs/core'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data User',
        href: "/data/users",
    },
];

interface UsersPageProps extends PageProps {
  users: {
    data: User[]
    current_page: number
    last_page: number
    total: number
  }
}

export default function DataUser({ users }: UsersPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <DataTable columns={columns} data={users.data} />
            </div>
        </AppLayout>
    );
}
