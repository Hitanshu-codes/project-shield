interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 via-cyan-300 to-purple-500 bg-clip-text text-transparent">
        {title}
      </h1>
      {description && <p className="mt-2 text-gray-400 max-w-3xl">{description}</p>}
    </div>
  )
}

