import './globals.css'
import { type Metadata } from 'next'
import { Zilla_Slab } from 'next/font/google'
import Link from 'next/link'

const zilla = Zilla_Slab({ weight: ['300', '500', '600'], style: ['italic', 'normal'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Oliver Northam - My Digital Garden',
  description: 'My space on the internet.'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en">
      <body className={zilla.className}>
          <header>
            <div className='logo'>
              <Link href='/'>Oli<span className='dot'>.</span></Link>
            </div>
          </header>
          {children}
        </body>
    </html>
  )
}
