import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { RegisterInput, LoginInput, UpdateProfileInput } from '../dtos/input/auth.input'
import { AuthOutput } from '../dtos/output/auth.output'
import { GraphqlContext } from '../graphql/context'
import { UserModel } from '../models/user.model'
import { IsAuth } from '../middlewares/auth.middleware'
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

  @Mutation(() => UserModel)
  @UseMiddleware(IsAuth)
  async updateProfile(
    @Arg('data', () => UpdateProfileInput) data: UpdateProfileInput,
    @Ctx() context: GraphqlContext
  ): Promise<UserModel> {
    const userId = context.user!
    return authService.updateProfile(userId, data)
  }
}
