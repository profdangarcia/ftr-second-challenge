import { InputType, Field } from 'type-graphql'
import { CategoryColorEnum } from '../../models/category.model'

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  title: string

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field(() => String)
  icon: string

  @Field(() => CategoryColorEnum)
  color: CategoryColorEnum
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => String, { nullable: true })
  title?: string | null

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field(() => String, { nullable: true })
  icon?: string | null

  @Field(() => CategoryColorEnum, { nullable: true })
  color?: CategoryColorEnum | null
}
