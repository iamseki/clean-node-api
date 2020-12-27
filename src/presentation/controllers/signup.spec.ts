import { SignUpController } from './signup'

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
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })
})
