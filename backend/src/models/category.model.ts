import { ObjectType, Field, ID } from 'type-graphql'
import { registerEnumType } from 'type-graphql'

export enum CategoryColorEnum {
  BLUE = 'BLUE',
  PURPLE = 'PURPLE',
  PINK = 'PINK',
  RED = 'RED',
  ORANGE = 'ORANGE',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN',
}

registerEnumType(CategoryColorEnum, {
  name: 'CategoryColor',
  description: 'Cor da categoria (paleta)',
})

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

  @Field(() => CategoryColorEnum)
  color: CategoryColorEnum

  @Field(() => String)
  createdAt: string

  @Field(() => String)
  updatedAt: string
}
