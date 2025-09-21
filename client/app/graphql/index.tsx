import type { TypedDocumentNode } from "@apollo/client";
import { ApolloClient, HttpLink, InMemoryCache, gql }  from "@apollo/client";

const client = new ApolloClient({
    link: new HttpLink({uri: "/graphql"}),
    cache: new InMemoryCache({resultCaching:false})
})

export default client;