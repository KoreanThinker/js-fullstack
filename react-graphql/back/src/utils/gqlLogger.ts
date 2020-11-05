import { ExpressContext } from "apollo-server-express/dist/ApolloServer"

const gqlLogger = (context: ExpressContext) => {
    let head = ''
    let schema = ''
    let name = ''

    if (context.req.body.query) {
        head = 'QUERY'
        schema = context.req.body.query
    }
    else if (context.req.body.body.mutation) {
        head = 'MUTATION'
        schema = context.req.body.body
    }
    else return

    const splitedSchema = schema.split('{')
    if (splitedSchema.length < 1) return
    const requestLine = splitedSchema[1].replace('\n', '')
    for (const chr of requestLine) {
        if (chr === ' ') continue
        if (chr === '(') break
        name += chr
    }

    console.log(head + ' : ' + name + ' ' + (Date.now() % 10000))
}

export default gqlLogger