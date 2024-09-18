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

function Header() {
  return (
    <a href="/"><h1 className="text-white text-4xl mb-5">Oli<span className="text-slate-500">.</span></h1></a>
  )
}

