const express = require("express");
const graphqlHTTP = require("express-graphql"); //it's going to handle gql requests
const schema = require("./schema/schema");

const app = express();

//handle graphql requests
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true //telling to show the graphi tool when we reach the /graphql endpoint
  })
);

const PORT = 4000;

app.listen(PORT, () => {
  console.log("listening requests on PORT ", PORT);
});
