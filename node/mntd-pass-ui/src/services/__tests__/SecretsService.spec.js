import SecretsServcice from '../SecretsService'
import axios from '@/http'
import MOCK_SECRETS_SERVICE from '@/constant/mock.data'
jest.mock('@/http', () => {
  return {
    // create: jest.fn(),
    get: jest.fn()
  }
})
describe('Services -> SecretsServcice', () => {
  it(`should get secrets by username`, async () => {
    axios.get.mockResolvedValue({
      data: MOCK_SECRETS_SERVICE.DATA_IN
    })
    let result = await SecretsServcice.getSecrets(
      MOCK_SECRETS_SERVICE.MOCK_USER,
      MOCK_SECRETS_SERVICE.TOKEN
    )
    expect(result).toEqual({
      data: MOCK_SECRETS_SERVICE.DATA_OUT
    })
  })
})
