import { Button } from '@/components/ui/button'
import { router } from "@inertiajs/react"
import { User } from "@/types"
import { useGlobalModal } from "@/store/useGlobalModal"

interface Props {
  data?: User
}

export default function UserDelete({ data }: Props) {

    const closeModal = useGlobalModal((s) => s.closeModal)
    const userId = data?.id as number;

    const handleDelete = (userId: number) => {
        if (!userId) {
            console.error('User ID is missing');
            return;
        }
        router.delete(`/destroy/data/users/${userId}`, {
            onSuccess: () => closeModal(),
            onError: (errors) => console.error(errors),
        })
    }

    return (
        <div className="space-y-4">
            <p>
            Are you sure you want to delete <strong>{data?.name}</strong>?
            </p>
            <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => closeModal()}>
                Cancel
            </Button>
            <Button
                variant="destructive"
                size="sm"
                disabled={!userId}
                onClick={() => handleDelete(userId)}
            >
                Confirm
            </Button>
            </div>
        </div>
        )
    }
