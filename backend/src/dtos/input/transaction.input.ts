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

@InputType()
export class UpdateTransactionInput {
  @Field(() => String, { nullable: true })
  categoryId?: string | null

  @Field(() => TransactionTypeEnum, { nullable: true })
  type?: TransactionTypeEnum | null

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field(() => String, { nullable: true })
  date?: string | null

  @Field(() => Number, { nullable: true })
  value?: number | null
}
