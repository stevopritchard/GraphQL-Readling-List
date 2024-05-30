import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

import BookList from './components/BookList';

const client = new ApolloClient({
  uri: 'https://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query GetBooks {
        books {
          id
          name
          genre
          authorId
        }
      }
    `,
  })
  .then((result) => console.log(result));

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="main">
        <h1>Stephen's Reading List</h1>
        <BookList></BookList>
      </div>
    </ApolloProvider>
  );
}

export default App;
