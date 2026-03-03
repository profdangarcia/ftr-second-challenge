import { ObjectType, Field, ID, Int } from 'type-graphql'
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
  description: 'Category color (palette)',
})

/** Available icons for categories (same keys as categoryIcons on the frontend, in UPPERCASE). */
export enum CategoryIconEnum {
  BRIEFCASE = 'BRIEFCASE',
  CAR = 'CAR',
  HEART_PULSE = 'HEART_PULSE',
  PIGGY_BANK = 'PIGGY_BANK',
  SHOPPING_CART = 'SHOPPING_CART',
  TICKET = 'TICKET',
  TOOL_CASE = 'TOOL_CASE',
  UTENSILS = 'UTENSILS',
  PAW_PRINT = 'PAW_PRINT',
  HOUSE = 'HOUSE',
  GIFT = 'GIFT',
  DUMBBELL = 'DUMBBELL',
  BOOK_OPEN = 'BOOK_OPEN',
  LUGGAGE = 'LUGGAGE',
  MAILBOX = 'MAILBOX',
  RECEIPT = 'RECEIPT',
}

registerEnumType(CategoryIconEnum, {
  name: 'CategoryIcon',
  description: 'Category icon (frontend palette)',
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

  @Field(() => CategoryIconEnum)
  icon: CategoryIconEnum

  @Field(() => CategoryColorEnum)
  color: CategoryColorEnum

  @Field(() => String)
  createdAt: string

  @Field(() => String)
  updatedAt: string

  @Field(() => Int, { description: 'Total transactions in this category' })
  transactionCount: number
}
