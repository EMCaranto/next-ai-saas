const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full overflow-auto bg-slate-900">
      <div className="mx-auto">{children}</div>
    </main>
  )
}

export default HomeLayout
