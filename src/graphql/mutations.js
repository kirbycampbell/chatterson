// eslint-disable
// this is an auto generated file. This will be overwritten

export const createPost = `mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
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
    }
  }
}
`;
export const updatePost = `mutation UpdatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
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
    }
  }
}
`;
export const deletePost = `mutation DeletePost($input: DeletePostInput!) {
  deletePost(input: $input) {
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
    }
  }
}
`;
export const createConversation = `mutation CreateConversation($input: CreateConversationInput!) {
  createConversation(input: $input) {
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
  }
}
`;
export const updateConversation = `mutation UpdateConversation($input: UpdateConversationInput!) {
  updateConversation(input: $input) {
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
  }
}
`;
export const deleteConversation = `mutation DeleteConversation($input: DeleteConversationInput!) {
  deleteConversation(input: $input) {
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
  }
}
`;
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
