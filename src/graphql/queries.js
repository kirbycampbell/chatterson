// eslint-disable
// this is an auto generated file. This will be overwritten

export const getPost = `query GetPost($id: ID!) {
  getPost(id: $id) {
    id
    body
    createdBy {
      id
      name
      password
      createdAt
      friends {
        nextToken
      }
      conversations {
        nextToken
      }
    }
    createdAt
    conversation {
      id
      name
      contents {
        nextToken
      }
      users {
        nextToken
      }
    }
  }
}
`;
export const listPosts = `query ListPosts(
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      body
      createdBy {
        id
        name
        password
        createdAt
      }
      createdAt
      conversation {
        id
        name
      }
    }
    nextToken
  }
}
`;
export const getConversation = `query GetConversation($id: ID!) {
  getConversation(id: $id) {
    id
    name
    contents {
      items {
        id
        body
        createdAt
      }
      nextToken
    }
    users {
      items {
        id
        name
        password
        createdAt
      }
      nextToken
    }
  }
}
`;
export const listConversations = `query ListConversations(
  $filter: ModelConversationFilterInput
  $limit: Int
  $nextToken: String
) {
  listConversations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      contents {
        nextToken
      }
      users {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    password
    createdAt
    friends {
      items {
        id
        name
        password
        createdAt
      }
      nextToken
    }
    conversations {
      items {
        id
        name
      }
      nextToken
    }
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      password
      createdAt
      friends {
        nextToken
      }
      conversations {
        nextToken
      }
    }
    nextToken
  }
}
`;
