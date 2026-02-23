import { GraphQLError } from 'graphql'
import { prismaClient } from '../../prisma/prisma'
import type { CreateCategoryInput, UpdateCategoryInput } from '../dtos/input/category.input'
import type { CategoryModel } from '../models/category.model'
import type { CategoryColorEnum } from '../models/category.model'

function toCategoryModel(
  category: {
    id: string
    userId: string
    title: string
    description: string | null
    icon: string
    color: string
    createdAt: Date
    updatedAt: Date
  },
  transactionCount = 0
): CategoryModel {
  return {
    id: category.id,
    userId: category.userId,
    title: category.title,
    description: category.description ?? null,
    icon: category.icon as CategoryModel['icon'],
    color: category.color as CategoryColorEnum,
    createdAt: category.createdAt.toISOString(),
    updatedAt: category.updatedAt.toISOString(),
    transactionCount,
  }
}

export async function create(data: CreateCategoryInput, userId: string): Promise<CategoryModel> {
  const category = await prismaClient.category.create({
    data: {
      userId,
      title: data.title,
      description: data.description ?? undefined,
      icon: data.icon,
      color: data.color,
    },
  })
  return toCategoryModel(category)
}

export async function update(
  categoryId: string,
  userId: string,
  data: UpdateCategoryInput
): Promise<CategoryModel> {
  const existing = await prismaClient.category.findFirst({
    where: { id: categoryId, userId },
  })
  if (!existing) {
    throw new GraphQLError('Categoria não encontrada.', {
      extensions: { code: 'NOT_FOUND' },
    })
  }
  const updateData: Record<string, unknown> = {}
  if (data.title !== undefined) updateData.title = data.title
  if (data.description !== undefined) updateData.description = data.description
  if (data.icon !== undefined) updateData.icon = data.icon
  if (data.color !== undefined) updateData.color = data.color
  const category = await prismaClient.category.update({
    where: { id: categoryId },
    data: updateData,
  })
  return toCategoryModel(category)
}

export async function remove(categoryId: string, userId: string): Promise<boolean> {
  const existing = await prismaClient.category.findFirst({
    where: { id: categoryId, userId },
  })
  if (!existing) {
    throw new GraphQLError('Categoria não encontrada.', {
      extensions: { code: 'NOT_FOUND' },
    })
  }
  await prismaClient.category.delete({ where: { id: categoryId } })
  return true
}

export async function listByUser(userId: string): Promise<CategoryModel[]> {
  const [categories, countRows] = await Promise.all([
    prismaClient.category.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    }),
    prismaClient.transaction.groupBy({
      by: ['categoryId'],
      where: { userId },
      _count: { _all: true },
    }),
  ])
  const countByCategoryId = new Map(
    countRows.map((row) => [row.categoryId, row._count._all])
  )
  return categories.map((cat) =>
    toCategoryModel(cat, countByCategoryId.get(cat.id) ?? 0)
  )
}
