import { Arg, Mutation, Resolver } from 'type-graphql'
import { RegisterInput, LoginInput } from '../dtos/input/auth.input'
import { AuthOutput } from '../dtos/output/auth.output'
import * as authService from '../services/auth.service'

@Resolver()
export class AuthResolver {
  @Mutation(() => AuthOutput)
  async register(@Arg('data', () => RegisterInput) data: RegisterInput): Promise<AuthOutput> {
    return authService.register(data)
  }

  @Mutation(() => AuthOutput)
  async login(@Arg('data', () => LoginInput) data: LoginInput): Promise<AuthOutput> {
    return authService.login(data)
  }
}
