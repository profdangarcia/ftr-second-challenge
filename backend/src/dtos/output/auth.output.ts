import { ObjectType, Field } from 'type-graphql'
import { UserModel } from '../../models/user.model.js'

@ObjectType()
export class AuthOutput {
  @Field(() => String)
  token: string

  @Field(() => String)
  refreshToken: string

  @Field(() => UserModel)
  user: UserModel
}
