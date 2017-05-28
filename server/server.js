import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';

import schema from './schema';

const app = express();

app.use('/graphql', cors(), graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000, () => console.log('OK.'));
