import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'
import { GraphqlContext } from '../graphql/context/index.js'
import { DashboardData } from '../models/dashboard.model.js'
import { IsAuth } from '../middlewares/auth.middleware.js'
import * as dashboardService from '../services/dashboard.service.js'

@Resolver()
export class DashboardResolver {
  @Query(() => DashboardData)
  @UseMiddleware(IsAuth)
  async getDashboardData(@Ctx() context: GraphqlContext): Promise<DashboardData> {
    const userId = context.user!
    return dashboardService.getDashboardData(userId)
  }
}
