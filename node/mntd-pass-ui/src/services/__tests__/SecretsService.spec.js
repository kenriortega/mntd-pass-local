import SecretsServcice from '../SecretsService'
import axios from '@/http'
import MOCK_DATA from '@/constant/mock.data'
jest.mock('@/http', () => {
  return {
    get: jest.fn()
  }
})
describe('Services -> SecretsServcice', () => {
  it(`should get secrets by username`, async () => {
    axios.get.mockResolvedValue({
      data: MOCK_DATA.MOCK_SECRETS_SERVICE.GET_SECRETS_DATA_IN
    })
    let result = await SecretsServcice.getSecrets(
      MOCK_DATA.MOCK_SECRETS_SERVICE.MOCK_USER,
      MOCK_DATA.MOCK_SECRETS_SERVICE.TOKEN
    )
    expect(result).toEqual({
      data: MOCK_DATA.MOCK_SECRETS_SERVICE.GET_SECRETS_DATA_OUT
    })
  })
  it(`should get secrets value by username and name of secret`, async () => {
    axios.get.mockResolvedValue({
      data: MOCK_DATA.MOCK_SECRETS_SERVICE.GET_SECRETS_VALUE_DATA_IN
    })
    let result = await SecretsServcice.getValueSecret(
      MOCK_DATA.MOCK_SECRETS_SERVICE.MOCK_USER,
      MOCK_DATA.MOCK_SECRETS_SERVICE.MOCK_SECRETS_NAME,
      MOCK_DATA.MOCK_SECRETS_SERVICE.TOKEN
    )
    expect(result).toEqual({
      data: MOCK_DATA.MOCK_SECRETS_SERVICE.GET_SECRETS_VALUE_DATA_OUT
    })
  })
})
