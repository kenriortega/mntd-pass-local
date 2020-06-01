import AuthServcice from '../AuthService'
import axios from '@/http'
import MOCK_DATA from '@/constant/mock.data'
jest.mock('@/http', () => {
  return {
    put: jest.fn(),
    post: jest.fn()
  }
})

describe('Auth -> AuthServcice', () => {
  it(`should login an user`, async () => {
    axios.post.mockResolvedValue({
      data: {
        username: 'kalix',
        fullName: 'kalix Ortega',
        role: 'worker',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoia2FsaXgiLCJmdWxsTmFtZSI6ImthbGl4IE9ydGVnYSIsInJvbGUiOiJ3b3JrZXIiLCJjcmVhdGVkQXQiOiIyMDIwLTA1LTE2VDIxOjU5OjA3LjU2OVoifSwiaWF0IjoxNTkxMDUwNjM1LCJleHAiOjE1OTEwNTM2MzV9.vyt1OnYkFa0D81jVxAf8F0XuABQyuDSF38bD03P-OME',
        createdAt: '2020-05-16T21:59:07.569Z'
      }
    })
    let result = await AuthServcice.auth(
      MOCK_DATA.MOCK_SECRETS_SERVICE.MOCK_USER,
      '1233'
    )
    expect(result).toEqual({
      data: {
        username: 'kalix',
        fullName: 'kalix Ortega',
        role: 'worker',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoia2FsaXgiLCJmdWxsTmFtZSI6ImthbGl4IE9ydGVnYSIsInJvbGUiOiJ3b3JrZXIiLCJjcmVhdGVkQXQiOiIyMDIwLTA1LTE2VDIxOjU5OjA3LjU2OVoifSwiaWF0IjoxNTkxMDUwNjM1LCJleHAiOjE1OTEwNTM2MzV9.vyt1OnYkFa0D81jVxAf8F0XuABQyuDSF38bD03P-OME',
        createdAt: '2020-05-16T21:59:07.569Z'
      }
    })
  })
})
