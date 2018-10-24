import React, { Component } from "react";
import { graphql, compose } from "react-apollo"; //react apollo bindings - it is bound using currying (at the export default below)
import { getAuthorsQuery, addBookMutation } from "../queries/queries";

class AddBook extends Component {
  //initial state
  state = {
    name: "",
    genre: "",
    authorid: ""
  };

  handleChange = e => {
    // console.log("e.target.name", e.target.name);
    //using the name prop of the element
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitForm = event => {
    console.log(this.state);
    event.preventDefault(); //avoiding page refreshers
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorid: this.state.authorid
      }
    });
  };

  //function to load authors from server and populate the options
  displayAuthors = () => {
    // console.log(this.props);
    const data = this.props.getAuthorsQuery;
    if (data.loading) {
      //if it's still loading, display a disabled option
      return <option disabled>Loading authors...</option>;
    } else {
      //if it has loaded
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
    const { name, genre, authorid } = this.state;
    return (
      <form id="add-book" onSubmit={this.submitForm}>
        <div className="field">
          <label>Book name: </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
        </div>

        <div className="field">
          <label>Genre: </label>
          <input
            type="text"
            name="genre"
            value={genre}
            onChange={this.handleChange}
          />
        </div>

        <div className="field">
          <label>Author: </label>
          <select
            name="authorid"
            onChange={this.handleChange}
            // onChange={e => this.setState({ authorid: e.target.value })}
          >
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default compose(
  //using compose to make more than one query
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }), //giving names so we can differentiate each query
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);

// export default graphql(getAuthorsQuery)(AddBook); //using the bindings from react apollo and the constructed query above
//we have access to the data queried from gql server using the component's props
