import { intArg, ObjectDefinitionBlock, arg } from "@nexus/schema/dist/core"

//Query
export const image = (t: ObjectDefinitionBlock<"Query">) => t.field('image', {
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


export const uploadImage = (t: ObjectDefinitionBlock<"Mutation">) => t.field('uploadImage', {
    type: 'Image',
    args: {
        image: arg({ type: 'Upload', required: true })
    },
    nullable: true,
    resolve: async (_, { image }, ctx) => {
        console.log('START UPLOAD IMAGE')
        const { url } = await ctx.s3Uploader.singleFileUploadResolver(image)
        console.log(url)
        return ctx.prisma.image.findOne({
            where: { id: 1 }
        })
    }
})