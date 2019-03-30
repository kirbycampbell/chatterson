// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreatePost = `subscription OnCreatePost {
  onCreatePost {
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
export const onUpdatePost = `subscription OnUpdatePost {
  onUpdatePost {
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
export const onDeletePost = `subscription OnDeletePost {
  onDeletePost {
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
export const onCreateConversation = `subscription OnCreateConversation {
  onCreateConversation {
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
export const onUpdateConversation = `subscription OnUpdateConversation {
  onUpdateConversation {
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
export const onDeleteConversation = `subscription OnDeleteConversation {
  onDeleteConversation {
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
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
