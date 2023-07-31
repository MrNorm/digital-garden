import React from 'react'
import { getClient } from '@/lib/graphql-client'
import { gql } from '@apollo/client'
import { slateToHtml } from 'slate-serializers'

export const revalidate = 3600

export default async function Home ({ params }: { params: { slug: string } }): Promise<JSX.Element> {
  const client = getClient()
  const query = gql`query {
    Projects(
      where: { slug: { equals: "${params.slug}" } }
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
  const html = slateToHtml(project.content) // TODO: Don't like this...

  return (
    <main>
        <h1>{project.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  )
}
