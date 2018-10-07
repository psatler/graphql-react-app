const express = require("express");
const graphqlHTTP = require("express-graphql"); //it's going to handle gql requests
const schema = require("./schema/schema");
const mongoose = require("mongoose");
require("dotenv").config(); //it was not working using only process.env, so this package was required

const app = express();

//must have a .env file at the project root directory
const USER = process.env.M_LAB_USER;
const PASSWD = process.env.M_LAB_PASSWD;
const PORT = 4000;

// console.log("Env vars", USER, PASSWD);

mongoose.connect(
  `
mongodb://${USER}:${PASSWD}@ds125453.mlab.com:25453/gql-react
`,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
mongoose.connection.once("open", () => {
  //callback to return when we connect the database
  console.log("connected to database");
});

//handle graphql requests
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true //telling to show the graphi tool when we reach the /graphql endpoint
  })
);

app.listen(PORT, () => {
  console.log("listening requests on PORT ", PORT);
});
