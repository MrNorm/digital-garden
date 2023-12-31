import React from 'react'
import { getClient } from '@/lib/graphql-client'
import { gql } from '@apollo/client'
import { serialize } from '@/lib/slate-serializer'

export const revalidate = 300
const client = getClient()

export async function generateStaticParams (): Promise<[{ slug: string }]> {
  const query = gql`query {
    Projects {
      docs {
        slug
      }
    }
  }`
  const { data } = await client.query({ query })
  const projects = data.Projects.docs // TODO: Sort this out

  return projects.map((project: { slug: string }) => ({
    slug: project.slug
  }))
}

export default async function Home ({ params }: { params: { slug: string } }): Promise<JSX.Element> {
  const slug = params?.slug ?? ''
  const query = gql`query {
    Projects(
      where: { slug: { equals: "${slug}" } }
      limit: 1
    ) {
      docs {
        title,
        tags { name },
        publishedDate,
        category { name },
        content
      }
      totalDocs
    }
  }`
  const { data } = await client.query({ query })
  const project = data.Projects.docs[0] // TODO: Sort this out

  return (
    <main>
        <h1>{project.title}</h1>
        <div className='page'>
          {serialize(project.content)}
        </div>
    </main>
  )
}
