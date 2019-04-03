// eslint-disable
// this is an auto generated file. This will be overwritten

export const createConversation = `mutation CreateConversation($input: CreateConversationInput!) {
  createConversation(input: $input) {
    id
    posts {
      items {
        id
        body
        createdByUserId
        createdAt
        convo
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
    posts {
      items {
        id
        body
        createdByUserId
        createdAt
        convo
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
    posts {
      items {
        id
        body
        createdByUserId
        createdAt
        convo
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
export const createPost = `mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
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
    convo
  }
}
`;
export const updatePost = `mutation UpdatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
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
    convo
  }
}
`;
export const deletePost = `mutation DeletePost($input: DeletePostInput!) {
  deletePost(input: $input) {
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
    convo
  }
}
`;
export const createUserConvo = `mutation CreateUserConvo($input: CreateUserConvoInput!) {
  createUserConvo(input: $input) {
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
export const updateUserConvo = `mutation UpdateUserConvo($input: UpdateUserConvoInput!) {
  updateUserConvo(input: $input) {
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
export const deleteUserConvo = `mutation DeleteUserConvo($input: DeleteUserConvoInput!) {
  deleteUserConvo(input: $input) {
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
