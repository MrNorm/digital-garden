import React from 'react'
import { type PageProps, graphql } from 'gatsby'

interface ProjectProps {
  markdownRemark: {
    title: string
    html: string
  }
}

function ProjectTemplate ({ data }: PageProps<ProjectProps>): JSX.Element {
  const post = data.markdownRemark

  return (
    <section>
      <h1>{ post.title }</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </section>
  )
}

export default ProjectTemplate

export const pageQuery = graphql`
  query markdownRemark(
    $id: String!
  ) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`
