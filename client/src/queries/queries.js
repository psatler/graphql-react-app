import { gql } from "apollo-boost"; //importing gql so we can parse/construct graphql queries into JS

//constructing the graphql query
const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

//constructing the graphql query
const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

//creating a mutation
const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorid: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorid) {
      name
      id
    }
  }
`;

export { getBooksQuery, getAuthorsQuery, addBookMutation };
