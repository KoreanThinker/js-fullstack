import { intArg, mutationField, queryField, stringArg } from "@nexus/schema"
import bcrypt from 'bcrypt'
import getPartnerId from '../utils/getPartnerId'
import jwtPartnerSign from '../utils/jwtPartnerSign'
import { PARTNER_ACCESS_TOKEN_NAME } from '../values'


//Query
export const partner = queryField('partner', {
    type: 'Partner',
    args: {
        id: intArg({ required: true }),
    },
    nullable: true,
    resolve: (_, { id }, ctx) => {
        return ctx.prisma.partner.findOne({
            where: { id: Number(id) }
        })
    }
})

export const iPartner = queryField('iPartner', {
    type: 'Partner',
    nullable: true,
    resolve: async (_, { }, ctx) => {
        try {
            const partnerId = getPartnerId(ctx)
            console.log(partnerId)
            const partner = ctx.prisma.partner.findOne({
                where: { id: Number(partnerId) }
            })
            if (!partner) throw new Error('Invalid Partner')
            return partner
        } catch (error) {
            ctx.expressContext.res.clearCookie(PARTNER_ACCESS_TOKEN_NAME)
            throw new Error('Invalid Error')
        }
    }
})

export const isPartnerLoggedIn = queryField('isPartnerLoggedIn', {
    type: 'Boolean',
    resolve: async (_, { }, ctx) => {
        try {
            const partnerId = getPartnerId(ctx)
            const partner = await ctx.prisma.partner.findOne({ where: { id: Number(partnerId) } })
            if (!partner) throw new Error('No Partner')
            return true
        } catch (error) {
            console.error(error)
            ctx.expressContext.res.clearCookie(PARTNER_ACCESS_TOKEN_NAME)
            return false
        }
    }
})



//Mutation
export const partnerSignup = mutationField('partnerSignup', {
    type: 'Partner',
    args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
        name: stringArg({ required: true })
    },
    resolve: async (_, { email, password, name }, ctx) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 12)
            const partner = await ctx.prisma.partner.create({
                data: {
                    email,
                    password: hashedPassword,
                    name
                }
            })
            jwtPartnerSign(String(partner.id), ctx)

            return partner
        } catch (error) {
            switch (error.code) {
                case 'P2002': throw new Error('Duplicated email')
                default: throw new Error('Invalid Error')
            }
        }
    }
})

export const partnerLogin = mutationField('partnerLogin', {
    type: 'Partner',
    args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true })
    },
    resolve: async (_, { email, password }, ctx) => {
        const partner = await ctx.prisma.partner.findOne({ where: { email } })
        if (!partner) throw new Error(`No such partner found for email: ${email}`)

        const valid = await bcrypt.compare(password, partner.password)
        if (!valid) throw new Error('Invalid password')

        jwtPartnerSign(String(partner.id), ctx)
        return partner
    }
})

export const partnerLogout = mutationField('partnerLogout', {
    type: 'Boolean',
    resolve: async (_, { }, ctx) => {
        ctx.expressContext.res.clearCookie(PARTNER_ACCESS_TOKEN_NAME)
        return true
    }
})

