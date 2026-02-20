import { InputType, Field } from 'type-graphql'
import { CategoryColorEnum, CategoryIconEnum } from '../../models/category.model'

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  title: string

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field(() => CategoryIconEnum)
  icon: CategoryIconEnum

  @Field(() => CategoryColorEnum)
  color: CategoryColorEnum
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => String, { nullable: true })
  title?: string | null

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field(() => CategoryIconEnum, { nullable: true })
  icon?: CategoryIconEnum | null

  @Field(() => CategoryColorEnum, { nullable: true })
  color?: CategoryColorEnum | null
}
