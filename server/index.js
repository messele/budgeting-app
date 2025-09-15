// 1. Import Dependencies
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const {default:controllers} =  require('./src/controllers/index.js');


// 3. GraphQL Schema
// This defines the structure of our API: the types and the queries.
const schema = `
  ${controllers.map(c => c.getType()).join('\n')}

  type Query {
    ${controllers.map(c => c.getQuery()).join('\n')}
  }

  type Mutation {
    ${controllers.map(c => c.getMutation()).join('\n')}
  }
 `


  // type Schedule {
  //   id: ID!
  //   frequency: String
  //   type: String
  //   start_date: String
  //   end_date: String
  // }

// 4. Resolvers
// These are the functions that are executed to fetch the data for a given query.
// The resolver name must match the query name in the schema.
const root = {
   ...controllers.reduce((p,c) => ({...p, ...(c ? c.getResolvers(): {})}), {})
};

// 5. Express Server Setup
const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(schema),
    rootValue: root,
    graphiql: true, // Enable the GraphiQL in-browser IDE
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}/graphql`);
});
