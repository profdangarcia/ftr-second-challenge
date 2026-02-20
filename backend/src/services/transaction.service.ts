import { GraphQLError } from 'graphql'
import { prismaClient } from '../../prisma/prisma'
import type { CreateTransactionInput, UpdateTransactionInput } from '../dtos/input/transaction.input'
import type { TransactionModel, TransactionListOutput } from '../models/transaction.model'
import { TransactionTypeEnum } from '../models/transaction.model'

export type TransactionFilters = {
  description?: string
  type?: TransactionTypeEnum
  categoryId?: string
  startDate?: string
  endDate?: string
}

export function toTransactionModel(tx: {
  id: string
  userId: string
  categoryId: string
  type: string
  description: string
  date: Date
  value: number
  createdAt: Date
  updatedAt: Date
}): TransactionModel {
  return {
    id: tx.id,
    userId: tx.userId,
    categoryId: tx.categoryId,
    type: tx.type as TransactionTypeEnum,
    description: tx.description,
    date: tx.date.toISOString(),
    value: tx.value,
    createdAt: tx.createdAt.toISOString(),
    updatedAt: tx.updatedAt.toISOString(),
  }
}

export async function create(data: CreateTransactionInput, userId: string): Promise<TransactionModel> {
  const category = await prismaClient.category.findFirst({
    where: { id: data.categoryId, userId },
  })
  if (!category) {
    throw new GraphQLError('Categoria não encontrada ou não pertence ao usuário.', {
      extensions: { code: 'BAD_USER_INPUT' },
    })
  }
  const date = new Date(data.date)
  if (Number.isNaN(date.getTime())) {
    throw new GraphQLError('Data inválida.', {
      extensions: { code: 'BAD_USER_INPUT' },
    })
  }
  const value = Math.abs(Math.round(data.value))
  const transaction = await prismaClient.transaction.create({
    data: {
      userId,
      categoryId: data.categoryId,
      type: data.type,
      description: data.description,
      date,
      value,
    },
  })
  return toTransactionModel(transaction)
}

export async function update(
  transactionId: string,
  userId: string,
  data: UpdateTransactionInput
): Promise<TransactionModel> {
  const existing = await prismaClient.transaction.findFirst({
    where: { id: transactionId, userId },
  })
  if (!existing) {
    throw new GraphQLError('Transação não encontrada.', {
      extensions: { code: 'NOT_FOUND' },
    })
  }
  if (data.categoryId != null) {
    const category = await prismaClient.category.findFirst({
      where: { id: data.categoryId, userId },
    })
    if (!category) {
      throw new GraphQLError('Categoria não encontrada ou não pertence ao usuário.', {
        extensions: { code: 'BAD_USER_INPUT' },
      })
    }
  }
  const updateData: Record<string, unknown> = {}
  if (data.categoryId !== undefined) updateData.categoryId = data.categoryId
  if (data.type !== undefined) updateData.type = data.type
  if (data.description !== undefined) updateData.description = data.description
  if (data.date !== undefined) {
    const date = new Date(data.date)
    if (Number.isNaN(date.getTime())) {
      throw new GraphQLError('Data inválida.', { extensions: { code: 'BAD_USER_INPUT' } })
    }
    updateData.date = date
  }
  if (data.value !== undefined) updateData.value = Math.abs(Math.round(data.value))
  const transaction = await prismaClient.transaction.update({
    where: { id: transactionId },
    data: updateData,
  })
  return toTransactionModel(transaction)
}

export async function remove(transactionId: string, userId: string): Promise<boolean> {
  const existing = await prismaClient.transaction.findFirst({
    where: { id: transactionId, userId },
  })
  if (!existing) {
    throw new GraphQLError('Transação não encontrada.', {
      extensions: { code: 'NOT_FOUND' },
    })
  }
  await prismaClient.transaction.delete({ where: { id: transactionId } })
  return true
}

export async function listByUser(
  userId: string,
  filters: TransactionFilters,
  limit: number,
  offset: number
): Promise<TransactionListOutput> {
  const where: Record<string, unknown> = { userId }
  if (filters.description != null && filters.description !== '') {
    where.description = { contains: filters.description }
  }
  if (filters.type != null) {
    where.type = filters.type
  }
  if (filters.categoryId != null && filters.categoryId !== '') {
    where.categoryId = filters.categoryId
  }
  if (filters.startDate != null || filters.endDate != null) {
    where.date = {}
    if (filters.startDate != null) {
      (where.date as Record<string, Date>).gte = new Date(filters.startDate)
    }
    if (filters.endDate != null) {
      (where.date as Record<string, Date>).lte = new Date(filters.endDate)
    }
  }
  const take = Math.min(Math.max(1, limit), 100)
  const [transactions, total] = await Promise.all([
    prismaClient.transaction.findMany({
      where,
      orderBy: [{ date: 'desc' }, { createdAt: 'desc' }],
      take,
      skip: Math.max(0, offset),
    }),
    prismaClient.transaction.count({ where }),
  ])
  return {
    items: transactions.map(toTransactionModel),
    total,
  }
}
