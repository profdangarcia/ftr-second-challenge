import { ObjectType, Field, ID } from 'type-graphql'
import { registerEnumType } from 'type-graphql'

export enum TransactionTypeEnum {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
}

registerEnumType(TransactionTypeEnum, {
  name: 'TransactionType',
  description: 'Despesa ou Receita',
})

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id: string

  @Field(() => String)
  userId: string

  @Field(() => String)
  categoryId: string

  @Field(() => TransactionTypeEnum)
  type: TransactionTypeEnum

  @Field(() => String)
  description: string

  @Field(() => String)
  date: string

  @Field(() => Number)
  value: number

  @Field(() => String)
  createdAt: string

  @Field(() => String)
  updatedAt: string
}
