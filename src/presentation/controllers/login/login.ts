import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  constructor(private readonly emailValidator: EmailValidatorAdapter) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }

    this.emailValidator.isValid(httpRequest.body.email)
    return badRequest(new MissingParamError('password'))
  }
}
