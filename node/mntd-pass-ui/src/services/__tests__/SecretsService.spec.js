import SecretsServcice from '../SecretsService'
import axios from '@/http'
import MOCK_DATA from '@/constant/mock.data'
jest.mock('@/http', () => {
  return {
    get: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    post: jest.fn()
  }
})
describe('Services -> SecretsServcice', () => {
  it(`should get all secrets by username`, async () => {
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
  it(`should get secret value by username and name of this secret`, async () => {
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

  it(`should update secrets value by username and name of secret`, async () => {
    axios.put.mockResolvedValue({
      data: {
        result: [1]
      }
    })
    let res = await SecretsServcice.updateSecretByName(
      MOCK_DATA.MOCK_SECRETS_SERVICE.MOCK_USER,
      MOCK_DATA.MOCK_SECRETS_SERVICE.MOCK_SECRETS_NAME,
      MOCK_DATA.MOCK_SECRETS_SERVICE.MOCK_SECRETS_VALUE,
      MOCK_DATA.MOCK_SECRETS_SERVICE.TOKEN
    )
    expect(res.data.result[0]).toEqual(1)
  })

  it(`should delete secret by username and name of secret`, async () => {
    axios.delete.mockResolvedValue({
      data: {
        result: 1
      }
    })
    let res = await SecretsServcice.deleteSecretByName(
      MOCK_DATA.MOCK_SECRETS_SERVICE.MOCK_USER,
      MOCK_DATA.MOCK_SECRETS_SERVICE.MOCK_SECRETS_NAME,
      MOCK_DATA.MOCK_SECRETS_SERVICE.TOKEN
    )
    expect(res.data.result).toEqual(1)
  })

  it(`should post secret `, async () => {
    axios.post.mockResolvedValue({
      data: MOCK_DATA.MOCK_SECRETS_SERVICE.POST_SECRETS_DATA_IN
    })
    let res = await SecretsServcice.createSecret(
      MOCK_DATA.MOCK_SECRETS_SERVICE.MOCK_USER,
      MOCK_DATA.MOCK_SECRETS_SERVICE.MOCK_SECRETS_NAME,
      MOCK_DATA.MOCK_SECRETS_SERVICE.MOCK_SECRETS_VALUE,
      MOCK_DATA.MOCK_SECRETS_SERVICE.MOCK_SECRETS_CATEGORY,
      MOCK_DATA.MOCK_SECRETS_SERVICE.TOKEN
    )
    expect(res).toEqual({
      data: MOCK_DATA.MOCK_SECRETS_SERVICE.POST_SECRETS_DATA_OUT
    })
  })
})
