// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateConversation = `subscription OnCreateConversation {
  onCreateConversation {
    id
    posts {
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
      }
      nextToken
    }
  }
}
`;
export const onUpdateConversation = `subscription OnUpdateConversation {
  onUpdateConversation {
    id
    posts {
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
      }
      nextToken
    }
  }
}
`;
export const onDeleteConversation = `subscription OnDeleteConversation {
  onDeleteConversation {
    id
    posts {
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
      }
      nextToken
    }
  }
}
`;
export const onCreatePost = `subscription OnCreatePost {
  onCreatePost {
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
export const onUpdatePost = `subscription OnUpdatePost {
  onUpdatePost {
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
export const onDeletePost = `subscription OnDeletePost {
  onDeletePost {
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
export const onCreateUserConvo = `subscription OnCreateUserConvo {
  onCreateUserConvo {
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
export const onUpdateUserConvo = `subscription OnUpdateUserConvo {
  onUpdateUserConvo {
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
export const onDeleteUserConvo = `subscription OnDeleteUserConvo {
  onDeleteUserConvo {
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
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
