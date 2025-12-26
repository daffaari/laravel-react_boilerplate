import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { useGlobalModal } from "@/store/useGlobalModal";

import { Toaster } from 'react-hot-toast';
import useFlashToast from '@/hooks/useFlashToast';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
  const { open, title, content, closeModal } = useGlobalModal()

  useFlashToast()

  return (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
      {children}

      {/* GLOBAL TOAST (1x ONLY) */}
      <Toaster
        position="top-right"
        toastOptions={{
            success: { duration: 4000 },
            error: { duration: 7000 },
            warning: { duration: 6000 },
            info: { duration: 5000 },
        }}
        />

      {/* GLOBAL MODAL (1x ONLY) */}
      <Dialog open={open} onOpenChange={closeModal}>
        <DialogContent>
          {title && (
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
          )}

          {content}
        </DialogContent>
      </Dialog>
    </AppLayoutTemplate>
  )
}
