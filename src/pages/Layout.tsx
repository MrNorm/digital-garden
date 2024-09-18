export { Layout }

import React from 'react'
import './Layout.css'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageLayout>
      <Header></Header>
      <Content>{children}</Content>
    </PageLayout>
  )
}

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full p-10'>
      {   children}
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

function Header() {
  return (
    <div className="flex">
      <a href="/"><img src={"/logo.svg"} alt="Logo for Oliver Northam digital garden" /></a>
    </div>    
  )
}