import { ObjectType, Field, ID, Int } from 'type-graphql'
import { TransactionModel } from './transaction.model'
import { CategoryColorEnum } from './category.model'

@ObjectType()
export class CategorySummaryItem {
  @Field(() => ID)
  categoryId: string

  @Field(() => String)
  title: string

  @Field(() => CategoryColorEnum)
  color: CategoryColorEnum

  @Field(() => Int)
  itemCount: number

  @Field(() => Number)
  totalValue: number
}

@ObjectType()
export class DashboardData {
  @Field(() => Number)
  totalBalance: number

  @Field(() => Number)
  monthlyIncome: number

  @Field(() => Number)
  monthlyExpenses: number

  @Field(() => [TransactionModel])
  recentTransactions: TransactionModel[]

  @Field(() => [CategorySummaryItem])
  categorySummaries: CategorySummaryItem[]
}
