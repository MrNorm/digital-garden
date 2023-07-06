import * as React from "react"
import { graphql } from "gatsby"

const ProjectTemplate = ({ data }) => {
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