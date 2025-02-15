import { ApolloServer } from "apollo-server";
import { schemaArray, resolvers } from "./schema/index.js";
import { WalloraAPI } from "./datasource.js";

const server = new ApolloServer({
  typeDefs: schemaArray,
  resolvers: resolvers,
  dataSources: () => ({
    walloraAPI: new WalloraAPI(),
  }),
  context: ({ req }) => ({
    accessToken: req.headers["authorization"].replace("Bearer ", ""),
  }),
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
