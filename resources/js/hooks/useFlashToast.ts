import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import toast from "react-hot-toast";

type FlashProps = {
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
};

export default function useFlashToast() {
    const { flash } = usePage().props as { flash?: FlashProps };

    useEffect(() => {
        if (!flash) return;

        if (flash.success) {
            toast.success(flash.success);
        }

        if (flash.error) {
            toast.error(flash.error);
        }

        if (flash.warning) {
            toast(flash.warning, {
                icon: "⚠️",
            });
        }

        if (flash.info) {
            toast(flash.info, {
                icon: "ℹ️",
            });
        }
    }, [flash]);
}
