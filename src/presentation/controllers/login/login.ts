import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  constructor(private readonly emailValidator: EmailValidatorAdapter) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
    if (!httpRequest.body.password) {
      return badRequest(new MissingParamError('password'))
    }

    if (!this.emailValidator.isValid(httpRequest.body.email)) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
