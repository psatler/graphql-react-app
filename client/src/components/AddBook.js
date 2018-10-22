import React, { Component } from "react";
import { gql } from "apollo-boost"; //importing gql so we can parse/construct graphql queries into JS
import { graphql } from "react-apollo"; //react apollo bindings - it is bound using currying (at the export default below)

//constructing the graphql query
const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

class AddBook extends Component {
  //function to load authors from server and populate the options
  displayAuthors = () => {
    const data = this.props.data;
    if (data.loading) {
      // console.log("here 1");
      //if it's still loading, display a disabled option
      return <option disabled>Loading authors...</option>;
    } else {
      //if it has loaded
      console.log(data.authors);
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  render() {
    // console.log(this.props);
    return (
      <form id="add-book">
        <div className="field">
          <label>Book name: </label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Genre: </label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Author: </label>
          <select>
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook); //using the bindings from react apollo and the constructed query above
//we have access to the data queried from gql server using the component's props
