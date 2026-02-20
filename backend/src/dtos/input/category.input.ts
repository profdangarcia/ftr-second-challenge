import { InputType, Field } from 'type-graphql'

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  title: string

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field(() => String)
  icon: string

  @Field(() => String)
  color: string
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => String, { nullable: true })
  title?: string | null

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field(() => String, { nullable: true })
  icon?: string | null

  @Field(() => String, { nullable: true })
  color?: string | null
}
