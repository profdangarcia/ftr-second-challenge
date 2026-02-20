import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class CategoryModel {
  @Field(() => ID)
  id: string

  @Field(() => String)
  userId: string

  @Field(() => String)
  title: string

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field(() => String)
  icon: string

  @Field(() => String)
  color: string

  @Field(() => String)
  createdAt: string

  @Field(() => String)
  updatedAt: string
}
