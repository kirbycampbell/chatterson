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
export const updatePost = `mutation UpdatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
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
export const deletePost = `mutation DeletePost($input: DeletePostInput!) {
  deletePost(input: $input) {
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
export const createConvoPosts = `mutation CreateConvoPosts($input: CreateConvoPostsInput!) {
  createConvoPosts(input: $input) {
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
export const updateConvoPosts = `mutation UpdateConvoPosts($input: UpdateConvoPostsInput!) {
  updateConvoPosts(input: $input) {
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
export const deleteConvoPosts = `mutation DeleteConvoPosts($input: DeleteConvoPostsInput!) {
  deleteConvoPosts(input: $input) {
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
export const createConversation = `mutation CreateConversation($input: CreateConversationInput!) {
  createConversation(input: $input) {
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
export const updateConversation = `mutation UpdateConversation($input: UpdateConversationInput!) {
  updateConversation(input: $input) {
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
export const deleteConversation = `mutation DeleteConversation($input: DeleteConversationInput!) {
  deleteConversation(input: $input) {
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
export const createUserConvo = `mutation CreateUserConvo($input: CreateUserConvoInput!) {
  createUserConvo(input: $input) {
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
export const updateUserConvo = `mutation UpdateUserConvo($input: UpdateUserConvoInput!) {
  updateUserConvo(input: $input) {
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
export const deleteUserConvo = `mutation DeleteUserConvo($input: DeleteUserConvoInput!) {
  deleteUserConvo(input: $input) {
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
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
