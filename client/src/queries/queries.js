import { gql } from '@apollo/client';

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      name
      genre
      author {
        name
        age
      }
    }
  }
`;

const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
      age
      books {
        name
        genre
      }
    }
  }
`;

const ADD_BOOK = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
      genre
    }
  }
`;

const GET_BOOK = gql`
  query GetBook($id: ID) {
    book(id: $id) {
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export { GET_BOOKS, GET_AUTHORS, ADD_BOOK, GET_BOOK };
