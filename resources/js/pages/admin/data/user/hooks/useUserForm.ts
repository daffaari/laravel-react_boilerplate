import { useForm } from "@inertiajs/react"
import { useEffect } from "react"
import { useGlobalModal } from "@/store/useGlobalModal"
import { User } from "@/types"

export function useUserForm(mode: "create" | "edit", data?: User) {
  const closeModal = useGlobalModal((s) => s.closeModal)

  const form = useForm({
    name: "",
    username: "",
    email: "",
    password: "",
  })

  useEffect(() => {
    if (mode === "edit" && data) {
      form.setData({
        name: data.name ?? "",
        username: data.username ?? "",
        email: data.email ?? "",
        password: "",
      })
    }
  }, [mode, data?.id])

  const submit = () => {
    if (mode === "create") {
      form.post("/save/data/users", {
        onSuccess: () => {
          form.reset()
          closeModal()
        },
      })
    } else {
      form.put(`/update/data/users/${data!.id}`, {
        onSuccess: closeModal,
      })
    }
  }

  return { form, submit, setData: form.setData, processing: form.processing, errors: form.errors }
}
