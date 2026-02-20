import { Arg, Ctx, Int, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { CreateTransactionInput, UpdateTransactionInput } from '../dtos/input/transaction.input'
import { GraphqlContext } from '../graphql/context'
import { TransactionModel } from '../models/transaction.model'
import { TransactionTypeEnum } from '../models/transaction.model'
import { IsAuth } from '../middlewares/auth.middleware'
import * as transactionService from '../services/transaction.service'

@Resolver()
export class TransactionResolver {
  @Mutation(() => TransactionModel)
  @UseMiddleware(IsAuth)
  async createTransaction(
    @Arg('data', () => CreateTransactionInput) data: CreateTransactionInput,
    @Ctx() context: GraphqlContext
  ): Promise<TransactionModel> {
    const userId = context.user!
    return transactionService.create(data, userId)
  }

  @Mutation(() => TransactionModel)
  @UseMiddleware(IsAuth)
  async updateTransaction(
    @Arg('id', () => String) id: string,
    @Arg('data', () => UpdateTransactionInput) data: UpdateTransactionInput,
    @Ctx() context: GraphqlContext
  ): Promise<TransactionModel> {
    const userId = context.user!
    return transactionService.update(id, userId, data)
  }

  @Query(() => [TransactionModel])
  @UseMiddleware(IsAuth)
  async listMyTransactions(
    @Ctx() context: GraphqlContext,
    @Arg('description', () => String, { nullable: true }) description?: string,
    @Arg('type', () => TransactionTypeEnum, { nullable: true }) type?: TransactionTypeEnum,
    @Arg('categoryId', () => String, { nullable: true }) categoryId?: string,
    @Arg('startDate', () => String, { nullable: true }) startDate?: string,
    @Arg('endDate', () => String, { nullable: true }) endDate?: string,
    @Arg('limit', () => Int, { defaultValue: 20 }) limit: number = 20,
    @Arg('offset', () => Int, { defaultValue: 0 }) offset: number = 0
  ): Promise<TransactionModel[]> {
    const userId = context.user!
    const filters: transactionService.TransactionFilters = {
      description,
      type,
      categoryId,
      startDate,
      endDate,
    }
    return transactionService.listByUser(userId, filters, limit, offset)
  }
}
