const MOCK_SECRETS_SERVICE = {
  MOCK_USER: 'kalix',
  MOCK_SECRETS_NAME: 'my-secret-38',
  MOCK_SECRETS_VALUE: 'newValue',
  MOCK_SECRETS_CATEGORY: 'payments',
  TOKEN:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoia2FsaXgiLCJmdWxsTmFtZSI6ImthbGl4IE9ydGVnYSIsInJvbGUiOiJ3b3JrZXIiLCJjcmVhdGVkQXQiOiIyMDIwLTA1LTE2VDIxOjU5OjA3LjU2OVoifSwiaWF0IjoxNTkxMDI2MTEyLCJleHAiOjE1OTEwMjkxMTJ9.Qb2yXGMCkeTid4PX-8FWDt4MeZHXhf9yaFdtU76jves',

  GET_SECRETS_DATA_IN: {
    count: 5,
    data: [
      {
        username: 'kalix',
        name: 'my-secret-38',
        category: 'payments',
        createdAt: '2020-05-30T18:58:39.840Z'
      },
      {
        username: 'kalix',
        name: 'my-secrets',
        category: 'personal',
        createdAt: '2020-05-30T18:38:17.780Z'
      }
    ]
  },
  GET_SECRETS_DATA_OUT: {
    count: 5,
    data: [
      {
        username: 'kalix',
        name: 'my-secret-38',
        category: 'payments',
        createdAt: '2 days ago'
      },
      {
        username: 'kalix',
        name: 'my-secrets',
        category: 'personal',
        createdAt: '2 days ago'
      }
    ]
  },
  GET_SECRETS_VALUE_DATA_IN: {
    username: 'kalix',
    name: 'my-secret-38',
    category: 'payments',
    value: 'hjhj',
    createdAt: '2020-05-30T18:58:39.840Z'
  },
  GET_SECRETS_VALUE_DATA_OUT: {
    username: 'kalix',
    name: 'my-secret-38',
    category: 'payments',
    value: 'hjhj',
    createdAt: '2020-05-30T18:58:39.840Z'
  },
  POST_SECRETS_DATA_IN: {
    username: 'kalix',
    name: 'my-secret-38',
    category: 'payments',
    createdAt: '2020-05-30T18:58:39.840Z'
  },
  POST_SECRETS_DATA_OUT: {
    username: 'kalix',
    name: 'my-secret-38',
    category: 'payments',
    createdAt: '2020-05-30T18:58:39.840Z'
  }
}

const MOCK_DATA = {
  MOCK_SECRETS_SERVICE
}

export default MOCK_DATA
