import styles from './page.module.css'
import { getClient } from '@/lib/graphql-client'
import { gql } from '@apollo/client'
import Link from 'next/link'

export const revalidate = 3600
const query = gql`query {
  Projects {
    docs {
      title,
      slug,
      tags { name },
      publishedDate,
      category { name }
    }
    totalDocs
  }
}`

export default async function Home (): Promise<JSX.Element> {
  const client = getClient()
  const { data } = await client.query({ query })
  const projects = data.Projects.docs

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Hello, my name is Oliver Northam and welcome to my space on the internet. From here you&lsquo;ll be able to learn about me, what projects I&lsquo;m working on and generally what I&lsquo;m getting up to in life.
        </p>
        <p>
          Established July 2023, this space is early days at the moment but I aim to contribute little and often to it as time goes on. Turning it from a dirt pile of unstyled text to a matured digital gardem.
        </p>
        <p>
          For some insight on what I&lsquo;m working on at the moment (including this site), check out the projects I have on below.
        </p>
        <ul>
          {projects.map(({ project, index }: { project: { slug: string, title: string }, index: number }) => {
            return (
              <li key={index}><Link href={`/project/${project.slug}`}>{project.title}</Link></li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}
