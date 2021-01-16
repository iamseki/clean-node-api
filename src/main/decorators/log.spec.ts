import { LogErrorRepository } from '../../data/protocols/log-error-repository'
import { ok, serverError } from '../../presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      return new Promise(resolve => resolve(ok(httpRequest.body)))
    }
  }
  return new ControllerStub()
}

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError(stack: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new LogErrorRepositoryStub()
}
interface SutTypes {
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
  sut: LogControllerDecorator
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    controllerStub,
    logErrorRepositoryStub,
    sut
  }
}

const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    name: 'any',
    email: 'any@mail.com',
    password: 'any_pass',
    passwordConfirmation: 'any_pass'
  }
})

describe('LogController Decorator', () => {
  test('Should call controller handle method', async () => {
    const { controllerStub, sut } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = makeFakeHttpRequest()

    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeHttpRequest()

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok(httpRequest.body))
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = serverError(fakeError)
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(error)))

    const httpRequest = makeFakeHttpRequest()

    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith(fakeError.stack)
  })
})
