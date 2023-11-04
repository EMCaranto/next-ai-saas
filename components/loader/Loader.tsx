import Image from 'next/image'

export const Loader = () => {
  return(
    <div className="h-full flex flex-col items-center justify-center gap-y-4">
      <div className="h-16 w-16 relative animate-pulse">
        <Image
          className="animate-bounce"
          src="/logo.png"
          alt="logo"
          fill
        />
      </div>
      <p className="text-sm text-muted-foreground">
        EMCube is thinking..
      </p>
    </div>
  )
}
