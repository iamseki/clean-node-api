import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      return new Promise(resolve => resolve({
        body: httpRequest.body,
        statusCode: 200
      }))
    }
  }
  return new ControllerStub()
}
interface SutTypes {
  controllerStub: Controller
  sut: LogControllerDecorator
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub)
  return {
    controllerStub,
    sut
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handle method', async () => {
    const { controllerStub, sut } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest: HttpRequest = {
      body: {
        name: 'any',
        email: 'any@mail.com',
        password: 'any_pass',
        passwordConfirmation: 'any_pass'
      }
    }

    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        name: 'any',
        email: 'any@mail.com',
        password: 'any_pass',
        passwordConfirmation: 'any_pass'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      body: httpRequest.body,
      statusCode: 200
    })
  })
})
