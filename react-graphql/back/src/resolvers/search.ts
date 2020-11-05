import { intArg, mutationField, queryField, stringArg } from "@nexus/schema"
import getUserId from "../utils/getUserId"


//Query
export const search = queryField('search', {
    type: 'Search',
    args: {
        keyword: stringArg({ required: true }),
        orderBy: stringArg({ required: true })
    },
    resolve: async (_, { keyword, orderBy }, ctx) => {
        const userId = getUserId(ctx)
        // add keyword to user data
        await ctx.prisma.searchKeyword.create({
            data: {
                keyword,
                User: { connect: { id: userId } }
            }
        })
        const items = await ctx.prisma.item.findMany({ orderBy: { createdAt: 'desc' } })
        return {
            orderBy,
            count: 1,
            items
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