import { intArg, arg, queryField, mutationField } from "@nexus/schema"

//Query
export const image = queryField('image', {
    type: 'Image',
    args: {
        id: intArg({ required: true })
    },
    nullable: true,
    resolve: (_, { id }, ctx) => {
        return ctx.prisma.image.findOne({
            where: { id: Number(id) }
        })
    }
})

//Mutation
export const uploadImage = mutationField('uploadImage', {
    type: 'Image',
    args: {
        image: arg({ type: 'Upload', required: true })
    },
    nullable: true,
    resolve: async (_, { image }, ctx) => {
        const { url } = await ctx.s3Uploader.singleFileUploadResolver(image)
        return ctx.prisma.image.create({ data: { src: url } })
    }
})