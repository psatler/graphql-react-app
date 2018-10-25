import React, { Component } from "react";
import { graphql } from "react-apollo"; //react apollo bindings - it is bound using currying (at the export default below)
import { getBookQuery } from "../queries/queries";

class BookDetails extends Component {
  displayBookDetails = () => {
    const { book } = this.props.data;

    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map(item => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected!</div>;
    }
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <ul id="book-details">{this.displayBookDetails()}</ul>
      </div>
    );
  }
}

//attaching the props to the query variable (as a second parameter)
export default graphql(getBookQuery, {
  options: props => {
    //whenever the props updates, this is gonna reset
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetails);
