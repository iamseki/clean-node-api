export interface EmailValidator {
  isValid (email: string): boolean
}

export * from '../../protocols'
export * from '../../../domain/usecases/add-account'
export * from '../../../domain/models/account'
