import React from 'react'

import Header from 'components/organisms/Header/Header'
import Footer from 'components/organisms/Footer/Footer'

interface LayoutProps {
  children: string | React.ReactNode | null
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ marginBottom: '2rem' }}>{children}</div>
      <Footer />
    </>
  )
}

export default Layout
