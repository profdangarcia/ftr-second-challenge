import { GraphQLError } from 'graphql'
import { prismaClient } from '../../prisma/prisma'
import type { CreateCategoryInput, UpdateCategoryInput } from '../dtos/input/category.input'
import type { CategoryModel } from '../models/category.model'

function toCategoryModel(category: {
  id: string
  userId: string
  title: string
  description: string | null
  icon: string
  color: string
  createdAt: Date
  updatedAt: Date
}): CategoryModel {
  return {
    id: category.id,
    userId: category.userId,
    title: category.title,
    description: category.description ?? null,
    icon: category.icon,
    color: category.color,
    createdAt: category.createdAt.toISOString(),
    updatedAt: category.updatedAt.toISOString(),
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
  const categories = await prismaClient.category.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
  return categories.map(toCategoryModel)
}
