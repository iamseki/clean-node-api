import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  constructor(private readonly emailValidator: EmailValidatorAdapter) { }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    if (!email) {
      return badRequest(new MissingParamError('email'))
    }
    if (!password) {
      return badRequest(new MissingParamError('password'))
    }

    if (!this.emailValidator.isValid(email)) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
