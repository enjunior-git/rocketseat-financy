import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { useAuthStore } from "@/stores/auth";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL ?? "http://localhost:4000/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
  const token = useAuthStore.getState().token;

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  }));

  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          listCategories: {
            merge: false,
          },
          listTransactions: {
            merge: false,
          },
        },
      },
    },
  }),
});
