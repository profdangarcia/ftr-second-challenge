import { useEffect, useState } from "react"
import { useMutation } from "@apollo/client/react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogCloseButton,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCategoryDialogStore } from "@/stores/categoryDialog"
import { useCategoriesStore } from "@/stores/categories"
import {
  CREATE_CATEGORY,
  type CreateCategoryInput,
} from "@/lib/graphql/mutations/CreateCategory"
import {
  UPDATE_CATEGORY,
  type UpdateCategoryInput,
} from "@/lib/graphql/mutations/UpdateCategory"
import { CATEGORY_ICON_COMPONENTS, type CategoryIconId } from "@/helpers/categoryIcons"
import {
  CATEGORY_COLOR_IDS,
  CATEGORY_COLOR_CLASS,
  type CategoryColorId,
} from "@/helpers/categoryColors"
import { getGraphQLMessage } from "@/lib/utils"
import { cn } from "@/lib/utils"
import type { ApolloCache } from "@apollo/client"
function evictCategoriesCache(cache: ApolloCache) {
  cache.evict({ id: "ROOT_QUERY", fieldName: "listMyCategories" })
  cache.gc()
}

export function CategoryDialog() {
  const { open, mode, category, close } = useCategoryDialogStore()
  const fetchCategories = useCategoriesStore((s) => s.fetchCategories)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [icon, setIcon] = useState<CategoryIconId>("BRIEFCASE")
  const [color, setColor] = useState<CategoryColorId>("GREEN")

  const [createCategory, { loading: creating }] = useMutation(CREATE_CATEGORY, {
    update: evictCategoriesCache,
  })
  const [updateCategory, { loading: updating }] = useMutation(UPDATE_CATEGORY, {
    update: evictCategoriesCache,
  })

  const loading = creating || updating

  useEffect(() => {
    if (!open) return
    if (mode === "edit" && category) {
      setTitle(category.title)
      setDescription(category.description ?? "")
      setIcon((category.icon as CategoryIconId) || "BRIEFCASE")
      setColor((category.color as CategoryColorId) || "GREEN")
    } else {
      setTitle("")
      setDescription("")
      setIcon("BRIEFCASE")
      setColor("GREEN")
    }
  }, [open, mode, category])

  const handleOpenChange = (next: boolean) => {
    if (!next) close()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      toast.error("Preencha o título.")
      return
    }

    try {
      if (mode === "create") {
        const input: CreateCategoryInput = {
          title: title.trim(),
          description: description.trim() || null,
          icon,
          color,
        }
        await createCategory({ variables: { data: input } })
        toast.success("Categoria criada.")
      } else if (category) {
        const input: UpdateCategoryInput = {
          title: title.trim(),
          description: description.trim() || null,
          icon,
          color,
        }
        await updateCategory({ variables: { id: category.id, data: input } })
        toast.success("Categoria atualizada.")
      }
      await fetchCategories()
      close()
    } catch (err) {
      toast.error(getGraphQLMessage(err))
    }
  }

  const iconIds = Object.keys(CATEGORY_ICON_COMPONENTS) as CategoryIconId[]

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogCloseButton />
        <DialogHeader className="pr-8">
          <DialogTitle>
            {mode === "edit" ? "Editar categoria" : "Nova categoria"}
          </DialogTitle>
          <DialogDescription>
            Organize suas transações com categorias
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Título"
            placeholder="Ex. Alimentação"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="space-y-2">
            <Input
              label="Descrição"
              type="text"
              placeholder="Descrição da categoria"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              helper="Opcional"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium leading-none text-gray-700">
              Ícone
            </label>
            <div className="grid grid-cols-8 gap-1">
              {iconIds.map((iconId) => {
                const IconComponent = CATEGORY_ICON_COMPONENTS[iconId]
                const selected = icon === iconId
                return (
                  <Button
                    key={iconId}
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setIcon(iconId)}
                    className={cn(
                      "h-8 w-8 shrink-0 text-gray-600",
                      selected && "border-2 border-brand-base bg-white"
                    )}
                    aria-label={`Ícone ${iconId}`}
                    aria-pressed={selected}
                  >
                    <IconComponent className="size-4" />
                  </Button>
                )
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium leading-none text-gray-700">
              Cor
            </label>
            <div className="flex gap-1.5">
              {CATEGORY_COLOR_IDS.map((colorId) => {
                const selected = color === colorId
                return (
                  <Button
                    key={colorId}
                    type="button"
                    variant="outline"
                    onClick={() => setColor(colorId)}
                    className={cn(
                      "h-8 flex-1 min-w-0 p-1 rounded-lg",
                      selected && "border-2 border-brand-base bg-white"
                    )}
                    aria-label={`Cor ${colorId}`}
                    aria-pressed={selected}
                  >
                    <div
                      className={cn(
                        "h-full w-full rounded-md",
                        CATEGORY_COLOR_CLASS[colorId]
                      )}
                    />
                  </Button>
                )
              })}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
