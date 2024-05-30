import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import BookList from './components/BookList';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

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
