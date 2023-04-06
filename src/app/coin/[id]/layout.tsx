const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      {children}
    </div>
  )
}

export default Layout
