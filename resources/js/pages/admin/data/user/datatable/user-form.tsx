import { useForm } from "@inertiajs/react"
import { useEffect, useState } from "react"
import { useGlobalModal } from "@/store/useGlobalModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "@/types"
import { DialogClose } from "@/components/ui/dialog"

import { useUserForm } from "../hooks/useUserForm"

interface Props {
  mode: "create" | "edit"
  data?: User
}

export default function UserForm({ mode, data }: Props) {

  const { form, submit, setData, processing, errors } = useUserForm(mode, data)

  return (
    <form onSubmit={(e) => { e.preventDefault(); submit() }} className="space-y-8">
      {/* FORM BODY */}
      <div className="rounded-lg bg-muted/40 p-6 space-y-6">
        {/* Username */}
        <div>
          <Label className="text-sm text-muted-foreground">
            Username
          </Label>
          <Input
            className="mt-2 bg-background"
            value={form.data.username}
            onChange={(e) => setData("username", e.target.value)}
          />
          {errors.username && (
            <p className="mt-1 text-xs text-destructive">
              {errors.username}
            </p>
          )}
        </div>

        {/* Name & Email */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label className="text-sm text-muted-foreground">
              Name
            </Label>
            <Input
              className="mt-2 bg-background"
              value={form.data.name}
              onChange={(e) => setData("name", e.target.value)}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-destructive">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <Label className="text-sm text-muted-foreground">
              Email
            </Label>
            <Input
              type="email"
              className="mt-2 bg-background"
              value={form.data.email}
              onChange={(e) => setData("email", e.target.value)}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-destructive">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Password (Create Only) */}
        {mode === "create" && (
          <div>
            <Label className="text-sm text-muted-foreground">
              Password
            </Label>
            <Input
              type="password"
              className="mt-2 bg-background"
              value={form.data.password}
              onChange={(e) => setData("password", e.target.value)}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-destructive">
                {errors.password}
              </p>
            )}
          </div>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3">
        <DialogClose asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
          >
            Cancel
          </Button>
        </DialogClose>

        <Button
          type="submit"
          size="sm"
          disabled={processing}
        >
          {mode === "create" ? "Create User" : "Update User"}
        </Button>
      </div>
    </form>
  )
}
