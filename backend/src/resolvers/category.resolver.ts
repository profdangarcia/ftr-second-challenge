import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { CreateCategoryInput } from '../dtos/input/category.input'
import { GraphqlContext } from '../graphql/context'
import { CategoryModel } from '../models/category.model'
import { IsAuth } from '../middlewares/auth.middleware'
import * as categoryService from '../services/category.service'

@Resolver()
export class CategoryResolver {
  @Mutation(() => CategoryModel)
  @UseMiddleware(IsAuth)
  async createCategory(
    @Arg('data', () => CreateCategoryInput) data: CreateCategoryInput,
    @Ctx() context: GraphqlContext
  ): Promise<CategoryModel> {
    const userId = context.user!
    return categoryService.create(data, userId)
  }

  @Query(() => [CategoryModel])
  @UseMiddleware(IsAuth)
  async listMyCategories(@Ctx() context: GraphqlContext): Promise<CategoryModel[]> {
    const userId = context.user!
    return categoryService.listByUser(userId)
  }
}
