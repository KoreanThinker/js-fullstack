import { gql, makeExecutableSchema } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';

const RootSchema = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

const RootResolver = {
    Query: {
        root: () => 'Root resolver is running!',
    },
    Mutation: {
        root: () => 'Root Mutation'
    }
};

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: [RootSchema],
    resolvers: [RootResolver],
});

export default schema