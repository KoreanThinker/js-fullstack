import { intArg, mutationField, queryField, stringArg } from "@nexus/schema"
import getUserId from "../utils/getUserId"

//Query
export const search = queryField('search', {
    type: 'Search',
    args: {
        keyword: stringArg({ required: true }),
        orderBy: stringArg({ required: true, default: 'Popular' })
    },
    resolve: async (_, { keyword, orderBy }, ctx) => {
        const items = await ctx.prisma.item.findMany({
            where: { name: { contains: keyword }, published: true },
            orderBy:
                orderBy === 'Popular' ? { orderCount: 'desc' } :
                    orderBy === 'Recent' ? { createdAt: 'desc' } :
                        orderBy === 'Cheap' ? { price: 'asc' } :
                            { price: 'desc' }
        })
        const count = await ctx.prisma.item.count({
            where: { name: { contains: keyword }, published: true },
        })
        return {
            orderBy,
            count,
            items,
            keyword
        }

    }
})


export const recentSearchKeywords = queryField('recentSearchKeywords', {
    type: 'SearchKeyword',
    list: true,
    resolve: async (_, { }, ctx) => {
        const userId = getUserId(ctx)
        return ctx.prisma.searchKeyword.findMany({
            where: { userId },
            take: 20,
            orderBy: { createdAt: 'desc' }
        })
    }
})


export const removeAllRecentSearchKeywords = mutationField('removeAllRecentSearchKeywords', {
    type: 'Boolean',
    resolve: async (_, { }, ctx) => {
        const userId = getUserId(ctx)
        await ctx.prisma.searchKeyword.deleteMany({ where: { userId } })
        return true
    }
})