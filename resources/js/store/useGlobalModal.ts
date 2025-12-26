import { create } from "zustand"
import { ReactNode } from "react"

interface GlobalModalState {
  open: boolean
  title?: string
  content: ReactNode | null

  openModal: (params: {
    title: string
    content: ReactNode
  }) => void

  closeModal: () => void
}

export const useGlobalModal = create<GlobalModalState>((set) => ({
  open: false,
  title: undefined,
  content: null,

  openModal: ({ title, content }) =>
    set({
      open: true,
      title,
      content,
    }),

  closeModal: () =>
    set({
      open: false,
      title: undefined,
      content: null,
    }),
}))
