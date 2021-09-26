/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
// You can delete this file if you're not using it

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.com/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */

exports.onPreInit = () => console.log("Loaded gatsby-starter-plugin")

// constants for your GraphQL Post and Author types
const POST_NODE_TYPE = `Post`
const USER_NODE_TYPE = `User`

const fetch = require(`node-fetch`)

exports.sourceNodes = async ({
    actions,
    createContentDigest,
    createNodeId,
    getNodesByType,
  }) => {
    const { createNode } = actions
  
    const data = {
      posts: await fetch('https://jsonplaceholder.typicode.com/posts')
                    .then(response => response.json()),
      users: await fetch('https://jsonplaceholder.typicode.com/users')
                    .then(response => response.json()),
    }
  
    // loop through data and create Gatsby nodes
    data.posts.forEach(post =>
      createNode({
        ...post,
        id: createNodeId(`${POST_NODE_TYPE}-${post.id}`),
        parent: null,
        children: [],
        internal: {
          type: POST_NODE_TYPE,
          content: JSON.stringify(post),
          contentDigest: createContentDigest(post),
        },
      })
    )

    data.users.forEach(user =>
      createNode({
        ...user,
        id: createNodeId(`${USER_NODE_TYPE}-${user.id}`),
        parent: null,
        children: [],
        internal: {
          type: USER_NODE_TYPE,
          content: JSON.stringify(user),
          contentDigest: createContentDigest(user),
        },
      })
    )
  
    return
  }
