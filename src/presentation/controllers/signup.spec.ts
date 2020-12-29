import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missing-param-error'

describe('SignUp', () => {
  test('Should return 400 if name is not provided', () => {
    // system under test, main class test
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any@email.com',
        password: 'any-pass',
        passwordConfirmation: 'any-pass'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if email is not provided', () => {
    // system under test, main class test
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'any',
        password: 'any-pass',
        passwordConfirmation: 'any-pass'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})
