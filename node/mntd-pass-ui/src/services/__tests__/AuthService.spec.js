import AuthServcice from '../AuthService'
import axios from '@/http'
import MOCK_DATA from '@/constant/mock.data'
jest.mock('@/http', () => {
  return {
    post: jest.fn()
  }
})

describe('Auth -> AuthServcice', () => {
  it(`should login an user`, async () => {
    axios.post.mockResolvedValue({
      data: MOCK_DATA.MOCK_USER_SERVICE.LOGIN_DATA_IN
    })
    let result = await AuthServcice.auth(
      MOCK_DATA.MOCK_SECRETS_SERVICE.MOCK_USER,
      MOCK_DATA.MOCK_USER_SERVICE.PASSWORD
    )
    expect(result).toEqual({
      data: MOCK_DATA.MOCK_USER_SERVICE.LOGIN_DATA_OUT
    })
  })
})
