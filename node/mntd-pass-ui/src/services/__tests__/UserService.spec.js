import UserServcice from '../UserService'
import axios from '@/http'
import MOCK_DATA from '@/constant/mock.data'
jest.mock('@/http', () => {
  return {
    put: jest.fn(),
    post: jest.fn()
  }
})

describe('User -> UserServcice', () => {
  it(`should post a new user`, async () => {
    axios.post.mockResolvedValue({
      data: {
        username: 'mntd3',
        fullName: 'Mntd mark3',
        role: 'basic',
        createdAt: '2020-06-01T22:28:17.668Z'
      }
    })
    let result = await UserServcice.signUp(
      MOCK_DATA.MOCK_SECRETS_SERVICE.MOCK_USER,
      '1233',
      '1234'
    )
    expect(result).toEqual({
      data: {
        username: 'mntd3',
        fullName: 'Mntd mark3',
        role: 'basic',
        createdAt: '2020-06-01T22:28:17.668Z'
      }
    })
  })
  it(`should put password for an username`, async () => {
    axios.put.mockResolvedValue({
      data: {
        resutl: 'in process'
      }
    })
    let result = await UserServcice.changePassword(
      '1233',
      '1234',
      MOCK_DATA.MOCK_SECRETS_SERVICE.MOCK_TOKEN
    )
    expect(result).toEqual({
      data: {
        resutl: 'in process'
      }
    })
  })
})
