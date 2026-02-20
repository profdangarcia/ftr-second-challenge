import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'
import { GraphqlContext } from '../graphql/context'
import { DashboardData } from '../models/dashboard.model'
import { IsAuth } from '../middlewares/auth.middleware'
import * as dashboardService from '../services/dashboard.service'

@Resolver()
export class DashboardResolver {
  @Query(() => DashboardData)
  @UseMiddleware(IsAuth)
  async getDashboardData(@Ctx() context: GraphqlContext): Promise<DashboardData> {
    const userId = context.user!
    return dashboardService.getDashboardData(userId)
  }
}
