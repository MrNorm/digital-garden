import escapeHTML from 'escape-html'
import React, { Fragment } from 'react'

interface Slate {
  bold?: boolean
  type?: string
  url?: string
  code?: boolean
  italic?: boolean
  text?: string
  children?: Slate[]
}

export const serialize = (children: Slate[]): any => children.map((node, i) => {
  if (node.text !== undefined) {
    let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />

    if (node.bold === true) {
      text = (
        <strong key={i}>
          {text}
        </strong>
      )
    }

    if (node.code === true) {
      text = (
        <code key={i}>
          {text}
        </code>
      )
    }

    if (node.italic === true) {
      text = (
        <em key={i}>
          {text}
        </em>
      )
    }

    // Handle other leaf types here...

    return (
      <Fragment key={i}>
        {text}
      </Fragment>
    )
  }

  if (node.children !== undefined) {
    switch (node.type) {
      case 'h1':
        return (
          <h1 key={i}>
            {serialize(node.children)}
          </h1>
        )
      // Iterate through all headings here...
      case 'h6':
        return (
          <h6 key={i}>
            {serialize(node.children)}
          </h6>
        )
      case 'blockquote':
        return (
          <blockquote key={i}>
            {serialize(node.children)}
          </blockquote>
        )
      case 'ul':
        return (
          <ul key={i}>
            {serialize(node.children)}
          </ul>
        )
      case 'ol':
        return (
          <ol key={i}>
            {serialize(node.children)}
          </ol>
        )
      case 'li':
        return (
          <li key={i}>
            {serialize(node.children)}
          </li>
        )
      case 'link':
        return (
          <a
            href={escapeHTML(node.url)}
            key={i}
          >
            {serialize(node.children)}
          </a>
        )

      default:
        return (
          <p key={i}>
            {serialize(node.children)}
          </p>
        )
    }
  }

  return null
})
