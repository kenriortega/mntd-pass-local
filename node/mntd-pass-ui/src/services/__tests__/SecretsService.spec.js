import SecretsServcice from '../SecretsService'
import axios from '@/http'
let token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoia2FsaXgiLCJmdWxsTmFtZSI6ImthbGl4IE9ydGVnYSIsInJvbGUiOiJ3b3JrZXIiLCJjcmVhdGVkQXQiOiIyMDIwLTA1LTE2VDIxOjU5OjA3LjU2OVoifSwiaWF0IjoxNTkxMDI2MTEyLCJleHAiOjE1OTEwMjkxMTJ9.Qb2yXGMCkeTid4PX-8FWDt4MeZHXhf9yaFdtU76jves'

jest.mock('@/http', () => {
  return {
    // create: jest.fn(),
    get: jest.fn()
  }
})
describe('Services -> SecretsServcice', () => {
  it(`should get secrets by username`, async () => {
    axios.get.mockResolvedValue({
      data: {
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
      }
    })
    let result = await SecretsServcice.getSecrets('kalix', token)
    expect(result).toEqual({
      data: {
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
      }
    })
  })
})
