import { InputType, Field } from 'type-graphql'
import { TransactionTypeEnum } from '../../models/transaction.model'

@InputType()
export class CreateTransactionInput {
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
}
