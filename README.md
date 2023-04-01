# gatsby-remark-mdx-relative-images

Current plugin works with [gatsby-plugin-mdx](https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx) which include node type `Mdx`.</br>
For `gatsby-transformer-remark` with node type `MarkdownRemark` use [gatsby-remark-relative-images](https://www.gatsbyjs.com/plugins/gatsby-remark-relative-images/)

Convert image paths in mdx frontmatter to be relative to their node's parent directory. This will help [gatsby-plugin-image](https://www.gatsbyjs.com/plugins/gatsby-plugin-image) process images for mdx frontmatter. This was built for use with NetlifyCMS.

## Install

* required [gatsby-plugin-mdx](https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx)
```bash
# yarn
yarn add gatsby-remark-mdx-relative-images

# npm
npm i gatsby-remark-mdx-relative-images
```

## Usage Example

/gatsby-config.js

```javascript
const path = require('node:path')
const staticFolder = path.join(__dirname, "/static");

module.exports = {
  /* ... */
  plugins: [
    // Add static assets before markdown files
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/uploads`,
        name: 'uploads',
      },
    },
    // Add source for md/mdx content
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'content',
      },
    },
     {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-mdx-relative-images`,
            options: {
              // [Optional] The root of "media_folder" in your config.yml
              // Defaults to "static"
              staticFolderName: staticFolder,
              // [Optional] Include the following fields, use dot notation for nested fields
              // All fields are included by default
              include: ['yourFieldInclude'],
              // [Optional] Exclude the following fields, use dot notation for nested fields
              // No fields are excluded by default
              exclude: ['yourFieldExclude'],
            },
          }
        ],
        mdxOptions: []
      },
    },
  ],
};
```

/static/admin/config.yml

```yml
# ...
media_folder: static/uploads
public_folder: /uploads
# ...
```

`/content/post.md` || `/content/post.mdx` || `/src/pages.md` || `/src/pages.mdx` file example

```md
---
templateKey: blog-post
title: Post title
description: Brewing with a Chemex probably seems like a complicated, time-consuming ordeal, but once you get used to the process, it becomes a soothing ritual that's worth the effort every time.
date: 2017-01-04T15:04:10.000Z
postImage: /uploads/postImage.jpg

---

![bodyImage](/uploads/bodyImage.jpg)

## What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also 
the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
```

ℹ️ Currently images paths from markdown fields will processed (=> /uploads/postImage.jpg) 

graphQl query

```javascript
{
  allMdx {
    nodes {
      frontmatter {
        postImage {
          childImageSharp {
            gatsbyImageData(layout: FIXED)
          }
        }
      }
      body
    }
  }
}
```
