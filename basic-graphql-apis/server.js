const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { v4: uuidv4 } = require('uuid');

// Sample data
const books = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    year: 1925,
    genre: 'Novel'
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    year: 1960,
    genre: 'Southern Gothic'
  }
];

// Define the schema using GraphQL schema language
const schema = buildSchema(`
  type Book {
    id: ID!
    title: String!
    author: String!
    year: Int
    genre: String
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
    searchBooks(query: String!): [Book!]!
  }

  type Mutation {
    addBook(title: String!, author: String!, year: Int, genre: String): Book
    updateBook(id: ID!, title: String, author: String, year: Int, genre: String): Book
    deleteBook(id: ID!): Book
  }
`);


// Define resolvers for the schema fields
const root = {
  // Resolver for fetching all books
  books: () => books,
  
  // Resolver for fetching a single book by ID
  book: ({ id }) => books.find(book => book.id === id),
  
  // Resolver for searching books
  searchBooks: ({ query }) => {
    const searchTerm = query.toLowerCase();
    return books.filter(
      book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
    );
  },

  // Mutation: Add a book
  addBook: ({ title, author, year, genre }) => {
    const newBook = {
      id: uuidv4(),
      title,
      author,
      year,
      genre
    };
    books.push(newBook);
    return newBook;
  },

  // Mutation: Update a book
  updateBook: ({ id, title, author, year, genre }) => {
    const book = books.find(book => book.id === id);
    if (!book) return null;

    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;
    if (year !== undefined) book.year = year;
    if (genre !== undefined) book.genre = genre;

    return book;
  },

  // Mutation: Delete a book
  deleteBook: ({ id }) => {
    const index = books.findIndex(book => book.id === id);
    if (index === -1) return null;
    const removed = books.splice(index, 1)[0];
    return removed;
  }
};

// Create an Express app
const app = express();

// Set up the GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  // Enable the GraphiQL interface for testing
  graphiql: true,
}));

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/graphql`);
});
