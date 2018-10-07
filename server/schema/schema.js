//the schema is going the describe the data, the graph, the types and relations among the types
const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//dummy data
let books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2" },
  { name: "The Long Earth", genre: "Sci-fi", id: "3" }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

//defines how we can jump into the graphql to query data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } }, //it needs to insert an id of the book
      resolve(parent, args) {
        //the args here is the same as above
        //the resolve function is where we write code to retrieve info from db/other source
        return _.find(books, { id: args.id });
      }
    }
  }
});

//exporting the schema
module.exports = new GraphQLSchema({
  query: RootQuery
});
