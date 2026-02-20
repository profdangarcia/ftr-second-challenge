import { startOfMonth, endOfMonth } from 'date-fns'
import { prismaClient } from '../../prisma/prisma'
import type { DashboardData } from '../models/dashboard.model'
import type { CategorySummaryItem } from '../models/dashboard.model'
import type { CategoryColorEnum, CategoryIconEnum } from '../models/category.model'
import * as transactionService from './transaction.service'
import * as categoryService from './category.service'

function getCurrentMonthRange(): { start: Date; end: Date } {
  const now = new Date()
  return { start: startOfMonth(now), end: endOfMonth(now) }
}

export async function getDashboardData(userId: string): Promise<DashboardData> {
  const { start: monthStart, end: monthEnd } = getCurrentMonthRange()
  const whereUser = { userId }
  const whereMonth = {
    userId,
    date: { gte: monthStart, lte: monthEnd },
  }

  const [
    totalIncomeResult,
    totalExpenseResult,
    monthlyIncomeResult,
    monthlyExpenseResult,
    recentListOutput,
    categories,
    categoryGroupBy,
  ] = await Promise.all([
    prismaClient.transaction.aggregate({
      where: { ...whereUser, type: 'INCOME' },
      _sum: { value: true },
    }),
    prismaClient.transaction.aggregate({
      where: { ...whereUser, type: 'EXPENSE' },
      _sum: { value: true },
    }),
    prismaClient.transaction.aggregate({
      where: { ...whereMonth, type: 'INCOME' },
      _sum: { value: true },
    }),
    prismaClient.transaction.aggregate({
      where: { ...whereMonth, type: 'EXPENSE' },
      _sum: { value: true },
    }),
    transactionService.listByUser(
      userId,
      {
        startDate: monthStart.toISOString(),
        endDate: monthEnd.toISOString(),
      },
      5,
      0
    ),
    categoryService.listByUser(userId),
    prismaClient.transaction.groupBy({
      by: ['categoryId'],
      where: whereMonth,
      _sum: { value: true },
      _count: { _all: true },
    }),
  ])

  const totalIncome = totalIncomeResult._sum.value ?? 0
  const totalExpense = totalExpenseResult._sum.value ?? 0
  const totalBalance = totalIncome - totalExpense
  const monthlyIncome = monthlyIncomeResult._sum.value ?? 0
  const monthlyExpenses = monthlyExpenseResult._sum.value ?? 0

  const categoryMap = new Map(categories.map((c) => [c.id, c]))
  const categorySummaries: CategorySummaryItem[] = categoryGroupBy.map((row) => {
    const category = categoryMap.get(row.categoryId)
    return {
      categoryId: row.categoryId,
      title: category?.title ?? '—',
      icon: (category?.icon ?? 'UTENSILS') as CategoryIconEnum,
      color: (category?.color ?? 'GREEN') as CategoryColorEnum,
      itemCount: row._count._all,
      totalValue: row._sum.value ?? 0,
    }
  })

  return {
    totalBalance,
    monthlyIncome,
    monthlyExpenses,
    recentTransactions: recentListOutput.items,
    categorySummaries,
  }
}
