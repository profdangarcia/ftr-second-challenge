import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  email: string

  @Field(() => String, { nullable: true })
  role?: string | null

  @Field(() => String)
  createdAt: string

  @Field(() => String)
  updatedAt: string
}
