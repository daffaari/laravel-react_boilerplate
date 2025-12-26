"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, PencilIcon, Trash } from "lucide-react"
import { useGlobalModal } from "@/store/useGlobalModal"
import UserForm from "./user-form"
import UserDelete from "./user-delete"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  id: number
  name: string
  username: string
  email: string
}

const ActionCell = ({ row }) => {
//   const { openEditModal, openDeleteConfirm } = useUserHandler();
  const openModal = useGlobalModal((s) => s.openModal)

  return (
    <div className="flex justify-center gap-2">
      <button
        onClick={() =>
          openModal({
            title: "Edit User",
            content: (
              <UserForm
                mode="edit"
                data={row.original}
              />
            ),
          })
        }
        className="flex items-center rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-yellow-500 hover:text-white"
      >
        <PencilIcon className="h-4 w-4" />
      </button>

      <button
         onClick={() =>
          openModal({
            title: "Delete User",
            content: (
              <UserDelete
                data={row.original}
              />
            ),
          })
        }
        className="flex items-center rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-red-500 hover:text-white"
      >
        <Trash className="h-4 w-4" />
      </button>
    </div>
  );
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
       <div className="text-center">
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Name <ArrowUpDown />
        </Button>
      </div>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("name")}</div>
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
       <div className="text-center">
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Username <ArrowUpDown />
        </Button>
      </div>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("username")}</div>
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
       <div className="text-center">
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Email <ArrowUpDown />
        </Button>
      </div>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("email")}</div>
    },
  },
   {
    id: "actions",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => <ActionCell row={row} />,
  },

]
