import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from 'App/Validators/BaseValidator'

export default class CreateSessionValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
   
    email: schema.string([
      rules.regex(/\S+@\S+\.\S+/),
    ]),

    password: schema.string([
      rules.minLength(8),
      
    ])
  })

  
  public messages: CustomMessages = {
    ...this.messages,
  }
}

