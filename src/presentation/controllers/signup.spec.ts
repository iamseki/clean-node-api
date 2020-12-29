import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missing-param-error'

const makeSut = (): SignUpController => {
  return new SignUpController()
}

describe('SignUp', () => {
  test('Should return 400 if name is not provided', () => {
    // system under test, main class test
    const sut = makeSut()
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
    const sut = makeSut()
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

  test('Should return 400 if password is not provided', () => {
    // system under test, main class test
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'any',
        email: 'any@any.com',
        passwordConfirmation: 'any-pass'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if passwordConfirmation is not provided', () => {
    // system under test, main class test
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'any',
        email: 'any@any.com',
        password: 'any-pass'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })
})
