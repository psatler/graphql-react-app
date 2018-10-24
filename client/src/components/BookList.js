import React, { Component } from "react";
import { graphql } from "react-apollo"; //react apollo bindings - it is bound using currying (at the export default below)
import { getBooksQuery } from "../queries/queries";

//components
import BookDetails from "./BookDetails";

class BookList extends Component {
  state = {
    selected: null
  };

  selectBook = book => {
    this.setState({
      selected: book.id
    });
  };

  displayBooks = () => {
    let { data } = this.props;
    if (data.loading) {
      return <div> Loading books ...</div>;
    }

    return data.books.map(book => {
      return (
        <li
          key={book.id}
          onClick={e => {
            this.selectBook(book);
          }}
        >
          {book.name}
        </li>
      );
    });
  };

  render() {
    console.log(this.props);
    const { selected } = this.state; //id of the selected book
    return (
      <div>
        <h1>Testing</h1>
        <ul id="book-list">{this.displayBooks()}</ul>

        <BookDetails bookId={selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList); //using the bindings from react apollo and the constructed query above
//we have access to the data queried from gql server using the component's props
