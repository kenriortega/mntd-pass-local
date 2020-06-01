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
      data: MOCK_DATA.MOCK_USER_SERVICE.SIGN_UP_DATA_IN
    })
    let result = await UserServcice.signUp(
      MOCK_DATA.MOCK_SECRETS_SERVICE.MOCK_USER,
      MOCK_DATA.MOCK_USER_SERVICE.PASSWORD
    )
    expect(result).toEqual({
      data: MOCK_DATA.MOCK_USER_SERVICE.SIGN_UP_DATA_OUT
    })
  })
  it(`should put password for an username`, async () => {
    axios.put.mockResolvedValue({
      data: {
        resutl: 'in process'
      }
    })
    let result = await UserServcice.changePassword(
      MOCK_DATA.MOCK_USER_SERVICE.PASSWORD,
      MOCK_DATA.MOCK_USER_SERVICE.PASSWORD,
      MOCK_DATA.MOCK_SECRETS_SERVICE.MOCK_TOKEN
    )
    expect(result).toEqual({
      data: {
        resutl: 'in process'
      }
    })
  })
})
