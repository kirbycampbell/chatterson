// eslint-disable
// this is an auto generated file. This will be overwritten

export const getConversation = `query GetConversation($id: ID!) {
  getConversation(id: $id) {
    id
    posts {
      items {
        id
        body
        createdByUserId
        createdAt
      }
      nextToken
    }
    users {
      items {
        id
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
      posts {
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
export const getPost = `query GetPost($id: ID!) {
  getPost(id: $id) {
    id
    body
    createdByUserId
    createdAt
    conversation {
      id
      posts {
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
      createdByUserId
      createdAt
      conversation {
        id
      }
    }
    nextToken
  }
}
`;
export const getUserConvo = `query GetUserConvo($id: ID!) {
  getUserConvo(id: $id) {
    id
    conversation {
      id
      posts {
        nextToken
      }
      users {
        nextToken
      }
    }
    users {
      id
      name
      password
      createdAt
      conversations {
        nextToken
      }
    }
  }
}
`;
export const listUserConvos = `query ListUserConvos(
  $filter: ModelUserConvoFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserConvos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      conversation {
        id
      }
      users {
        id
        name
        password
        createdAt
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
    conversations {
      items {
        id
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
      conversations {
        nextToken
      }
    }
    nextToken
  }
}
`;
