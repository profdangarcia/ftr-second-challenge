interface PageTitleProps {
  title: string
  description?: string
}
export function PageTitle({ title, description }: PageTitleProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <p className="text-muted-foreground text-gray-600">
        {description}
      </p>
    </div>
  )
}