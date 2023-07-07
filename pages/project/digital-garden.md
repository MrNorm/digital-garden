---
date: "2023-07-06"
title: "Digital Garden"
id: "digital-garden"
---

# Digital Garden 🌻

> Oh no, not another one.

If you've visited oli.me in the past, you'll always see it in some state of disrepair or incompleteness. To be honest, I just find it difficult to manage a personal site project from start to finish alongside life. I've recently been enjoying the idea of using this space as a [digital garden](https://github.com/lyz-code/best-of-digital-gardens). rather than making it a blog, or a full blown website. Here's another attempt in a stripped back fashion, in the form of a digital garden.

I've recently been using [Obsidian](https://obsidian.md) to manage a lot of aspect of my life and found the simplicity of using Markdown with a brain works really well for me. It now syncs using git and allows me to access it's content via desktop and mobile.

In the most recent failed attempt at making something of oli.me, I started using Markdown files with some code to walk through directories and build a static site with it. This worked fine but it still felt like it was missing some functionality when writing content.

It wasn't until I stumbled across some articles for `gatsby-transformer-remark` and `gatsby-source-filesystem` that I realised how easy it was to construct something similar in [Gatsby](https://gatsbyjs.com/) with Obsidian, without needing a CMS or lots of structure. 

For me, this is perfect as I can simply add thoughts or pages without huge amounts of effort. For most of it, I can render content using generic templates but for any special or specific types of content, I can render it through something more bespoke. 

## Implementation Notes 👨‍💻

### Structure

In it's most basic form, the project looks like this

```
pages/
	.obsidian/
	project/
		digital-garden.md
src/
	templates/
		project.js
gatsby-config.js
gatsby-node.js
```

#### `/pages`
I'm using this path as the source of my content and for my Obsidian vault. Within here, all my content is created and managed using Obsidian.

#### `/src`
Where the magic happens and where the main source code of the digital garden sits. In it's basic form above.

#### `/src/templates/project.js`
I have defined a single `project.js` template which is what is currently rendering this page. It's split into two sections- the first is the actual rendering of the page and the second is the GraphQL query executed to extract the parsed Markdown content and frontmatter (think Markdown metadata) from the page UUID passed into it from `gatsby-node.js` below.

```
import * as React from "react"

import { graphql } from "gatsby"

  

const ProjectTemplate = ({ data }) => {

  const post = data.markdownRemark

  

  return (

    <section>

      <h1>{post.title}</h1>

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
```

#### `/gatsby-config.js`
The core configuration for Gatsby and where this site defines two plugins: The first is `gatsby-source-filesystem` which iterates through a given path for files. The second is `gatsby-transformer-remark` which is what renders Markdown content into HTML for us to use. At the moment I've only defined 'project' here but you can use the plugin multiple times to define multiple paths.

```
module.exports = {

  plugins: [

    {

      resolve: `gatsby-source-filesystem`,

      options: {

        name: `project`,

        path: `${__dirname}/pages/project`,

      },

    },

    `gatsby-transformer-remark`

  ],

}
```

#### `/gatsby-node.js`
A lot of tutorials using `gatsby-transformer-remark` would get you to use the Gatsby FS Route API to render content. This is fine if you want to use the same template for all Markdown content but I 
want to define different templates for different types of content. 

To work around this, we're going to hang off Gatsby `createPages` to add pages in ourselves, rather than using built in functionality. This may not be the best approach but it's a first pass and works for my current needs.

```
const path = require(`path`)

  

exports.createPages = async ({ graphql, actions, reporter }) => {

    const { createPage } = actions

    const dataTypes = ["project"];

  

    for (const dataType of dataTypes) {

        const result = await graphql(`

            {

                typeQuery: allMarkdownRemark(

                    filter: {fileAbsolutePath: {regex: "/\/${dataType}\//"}}

                ) {

                nodes {

                    id

                    frontmatter {

                        id

                    }

                }

                }

            }`)

  

        const nodes = result.data.typeQuery.nodes

  

        if (nodes.length > 0) {

            nodes.forEach((node, index) => {

                createPage({

                    path: `/${dataType}/` + node.frontmatter.id,

                    component: path.resolve(`./src/templates/${dataType}.js`),

                    context: {

                        id: node.id,

                    },

                })

            })

        }

    }

}
```

There's a few things happening above but in summary:

- The `dataTypes` constant array defines what types of content I'd like Gatsby to handle.  
- For each `dataTypes` value, the code then executes a GraphQL query, asking the database for all Markdown content that matches a path containing the `dataType` value (e.g. '/project/')
- For each result returned by GraphQL, we use the `createPage` API to add our page into the Gatsby outputs. We also specify the `component` variable with a template names after the current `dataType` value (e.g. /src/templates/**project.js**). The `path` variable is the URI of where we want the content to be (e.g. /projects/digital-garden). Finally, we pass `id` via the `context` variable which is what is used in the `pageQuery` GraphQL query within the template created above.

## Next Steps 💡

At the moment this is going straight into my [GitHub](https://github.com/MrNorm/digital-garden), so next steps will be to utilise GitHub Actions and push to a provider automatically as changes happen. When done, I'll document it here and probably do something crazy, like strikethrough this entire paragraph. 

## Final Thoughts 🧠

I really like this project as it captures the idea of digital gardens perfectly for me. I've been able to establish a simple way to render content and lay foundations to build on it in small iterations over time. Hopefully you found this as interesting as I did.

