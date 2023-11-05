interface EmptyProps {
  label: string
}

export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center p-20">
      <p className="text-center text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
