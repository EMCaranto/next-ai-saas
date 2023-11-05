import Image from 'next/image'

export const Loader = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-4">
      <div className="relative h-16 w-16 animate-pulse">
        <Image className="animate-bounce" src="/logo.png" alt="logo" fill />
      </div>
      <p className="text-sm text-muted-foreground">EMCube is thinking..</p>
    </div>
  )
}
