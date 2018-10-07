//the schema is going the describe the data, the graph, the types and relations among the types
const graphql = require("graphql");
const _ = require("lodash");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

//importing the models from mongoose/mongodb
const Book = require("../models/book");
const Author = require("../models/author");

//dummy data
// let books = [
//   { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
//   { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
//   { name: "The Long Earth", genre: "Sci-fi", id: "3", authorId: "3" },
//   { name: "The dafsd fdfsd Empire", genre: "Fantasy", id: "4", authorId: "2" },
//   { name: "The test testidasd", genre: "Sci-fi", id: "5", authorId: "3" },
//   { name: "Pasd mdsfsf ", genre: "Fantasy", id: "6", authorId: "3" },
//   { name: "Tdsfd sfsdf sd", genre: "Sci-fi", id: "7", authorId: "3" }
// ];

// var authors = [
//   { name: "Patrick Ruffus", age: 44, id: "1" },
//   { name: "Brandon Sanderson", age: 42, id: "2" },
//   { name: "Terry Crews", age: 39, id: "3" }
// ];

//######## Types ########
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    //wrapping this fields inside a function so we load the code, but does not execute it right away, running them later after
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent); //returns all the properties of the parent (in this case, books)
        // return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      //several books, so, a list
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //parent.id is the id in the AuthorType
        // return _.filter(books, { authorId: parent.id }); //filter on the books array for the authorId
      }
    }
  })
});

//######## Queries ########

//defines how we can jump into the graphql to query data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType, //gets a book by its ID
      args: { id: { type: GraphQLID } }, //it needs to insert an id of the book
      resolve(parent, args) {
        //the args here is the same as above
        //the resolve function is where we write code to retrieve info from db/other source
        // return _.find(books, { id: args.id });
      }
    },
    author: {
      //gets an author by its ID
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
      }
    },
    //list of books of type BookType
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
      }
    }
  }
});

//##################3 MUTATIONS #################
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        //using the model constructor imported above
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    }
  }
});

//exporting the schema - operations the user can perform
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
