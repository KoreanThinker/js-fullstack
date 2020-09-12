import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';

const app = express();
const server = new ApolloServer({
    schema,
    playground: true
});

app.use('*', cors());
app.use(compression());

server.applyMiddleware({ app, path: '/graphql' });

app.listen(
    { port: 8000 },
    (): void => console.log(`Server started on port 8000`)
);