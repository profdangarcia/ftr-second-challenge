import { prismaClient } from '../../prisma/prisma'
import type { CreateCategoryInput } from '../dtos/input/category.input'
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

export async function listByUser(userId: string): Promise<CategoryModel[]> {
  const categories = await prismaClient.category.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
  return categories.map(toCategoryModel)
}
