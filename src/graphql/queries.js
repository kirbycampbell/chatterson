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
      conversations {
        nextToken
      }
    }
    createdAt
    conversation {
      id
      contents {
        nextToken
      }
      conversations {
        id
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
      }
    }
    nextToken
  }
}
`;
export const getConvoPosts = `query GetConvoPosts($id: ID!) {
  getConvoPosts(id: $id) {
    id
    contents {
      items {
        id
        body
        createdAt
      }
      nextToken
    }
    conversations {
      id
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
export const listConvoPostss = `query ListConvoPostss(
  $filter: ModelConvoPostsFilterInput
  $limit: Int
  $nextToken: String
) {
  listConvoPostss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      contents {
        nextToken
      }
      conversations {
        id
      }
    }
    nextToken
  }
}
`;
export const getConversation = `query GetConversation($id: ID!) {
  getConversation(id: $id) {
    id
    contents {
      items {
        id
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
export const getUserConvo = `query GetUserConvo($id: ID!) {
  getUserConvo(id: $id) {
    id
    conversation {
      id
      contents {
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
