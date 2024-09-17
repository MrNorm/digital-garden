export { Layout }

import React from 'react'
import './Layout.css'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageLayout>
      <Content>{children}</Content>
    </PageLayout>
  )
}

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full p-10'>
      {children}
    </div>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}