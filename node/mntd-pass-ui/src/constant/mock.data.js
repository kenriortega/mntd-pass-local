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

const MOCK_USER_SERVICE = {
  PASSWORD: 'password',
  SIGN_UP_DATA_IN: {
    username: 'mntd3',
    fullName: 'Mntd mark3',
    role: 'basic',
    createdAt: '2020-06-01T22:28:17.668Z'
  },
  SIGN_UP_DATA_OUT: {
    username: 'mntd3',
    fullName: 'Mntd mark3',
    role: 'basic',
    createdAt: '2020-06-01T22:28:17.668Z'
  },
  LOGIN_DATA_IN: {
    username: 'kalix',
    fullName: 'kalix Ortega',
    role: 'worker',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoia2FsaXgiLCJmdWxsTmFtZSI6ImthbGl4IE9ydGVnYSIsInJvbGUiOiJ3b3JrZXIiLCJjcmVhdGVkQXQiOiIyMDIwLTA1LTE2VDIxOjU5OjA3LjU2OVoifSwiaWF0IjoxNTkxMDUwNjM1LCJleHAiOjE1OTEwNTM2MzV9.vyt1OnYkFa0D81jVxAf8F0XuABQyuDSF38bD03P-OME',
    createdAt: '2020-05-16T21:59:07.569Z'
  },
  LOGIN_DATA_OUT: {
    username: 'kalix',
    fullName: 'kalix Ortega',
    role: 'worker',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoia2FsaXgiLCJmdWxsTmFtZSI6ImthbGl4IE9ydGVnYSIsInJvbGUiOiJ3b3JrZXIiLCJjcmVhdGVkQXQiOiIyMDIwLTA1LTE2VDIxOjU5OjA3LjU2OVoifSwiaWF0IjoxNTkxMDUwNjM1LCJleHAiOjE1OTEwNTM2MzV9.vyt1OnYkFa0D81jVxAf8F0XuABQyuDSF38bD03P-OME',
    createdAt: '2020-05-16T21:59:07.569Z'
  }
}
const MOCK_DATA = {
  MOCK_SECRETS_SERVICE,
  MOCK_USER_SERVICE
}

export default MOCK_DATA
