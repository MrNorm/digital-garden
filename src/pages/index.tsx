import React from 'react'
import { type PageProps, graphql, Link } from 'gatsby'

interface IndexProps {
  introCutting: {
    frontmatter: {
      title: string
      date: string
    }
    html: string
  }
  projectsCutting: {
    frontmatter: {
      title: string
      date: string
    }
    html: string
  }
  projectsList: {
    edges: ProjectListProps[]
  }
}

interface ProjectListProps {
  node: {
    frontmatter: {
      title: string
      date: string
      id: string
    }
  }
}

function IndexTemplate ({ data }: PageProps<IndexProps>): JSX.Element {
  const introCutting = data.introCutting
  const projectsCutting = data.projectsCutting
  const projectsList = data.projectsList.edges

  return (
    <section>
      <section>
        <h1>{introCutting.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: introCutting.html }} />
      </section>
      <section>
        <h2>{projectsCutting.frontmatter.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: projectsCutting.html }} />
        <ul>
          {
            projectsList.map((project, i) => {
              return <li key={project.node.frontmatter.id}><Link to={'/project/' + project.node.frontmatter.id}>{project.node.frontmatter.title}</Link></li>
            })
          }
        </ul>
      </section>
    </section>
  )
}

export default IndexTemplate

export const pageQuery = graphql`
{
  introCutting: markdownRemark(
    frontmatter: {area: {eq: "home"}, id: {eq: "intro"}}
    fileAbsolutePath: {regex: "//cutting//"}
  ) {
    html
    frontmatter {
      date(formatString: "MMMM DD, YYYY")
      title
    }
  }
  projectsCutting: markdownRemark(
    frontmatter: {area: {eq: "home"}, id: {eq: "projects"}}
    fileAbsolutePath: {regex: "//cutting//"}
  ) {
    html
    frontmatter {
      date(formatString: "MMMM DD, YYYY")
      title
    }
  }
  projectsList: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "//project//"}}
  ) {
    edges {
      node {
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          id
        }
      }
    }
  }
}
`
