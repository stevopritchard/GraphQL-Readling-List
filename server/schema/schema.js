import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';

import Book from '../models/book.js';
import Author from '../models/author.js';

// dummy data
// var books = [
//   { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
//   { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
//   { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
//   { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
//   { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
//   { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
// ];

// var authors = [
//   { name: 'Patrick Rothfuss', age: 44, id: '1' },
//   { name: 'Brandon Sanderson', age: 42, id: '2' },
//   { name: 'Terry Pratchett', age: 66, id: '3' },
// ];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    genre: {
      type: GraphQLString,
    },
    author: {
      type: AuthorType,
      resolve: (parent) =>
        // authors.find((author) => author.id === parent.authorId),
        {
          console.log(parent);
          return Author.findById(parent.authorId);
        },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent) =>
        // books.filter((book) => book.authorId === parent.id),
        Book.find({ authorId: parent.id }),
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) =>
        // books.find((book) => book.id === args.id),
        Book.findById(args.id),
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: () =>
        // books,
        Book.find(),
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, { id }) =>
        // authors.find((author) => author.id === id),
        Author.findById(args.id),
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: () =>
        // authors,
        Author.find(),
    },
  },
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_, args) => {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        author
          .save()
          .then(() => author)
          .catch((error) => console.log(`Error: ${error}`));
        return author;
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_, args) => {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        book
          .save()
          .then(() => console.log(book))
          .catch((error) => console.log(`Error: ${error}`));
        return book;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType,
});
export { schema };
