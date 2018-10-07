//the schema is going the describe the data, the graph, the types and relations among the types
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } }, //it needs to insert an id of the book
      resolve(parent, args) {
        //the args here is the same as above
        //the resolve function is where we write code to retrieve info from db/other source
      }
    }
  }
});

//exporting the schema
module.exports = new GraphQLSchema({
  query: RootQuery
});
