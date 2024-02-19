const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('./schema'); // Adjust the path to where your schema file is located

// MongoDB connection string
const MONGO_URI = 'mongodb+srv://root:tWtd2XUS7bEYFBMR@cluster0.bs6u4dl.mongodb.net/comp3133_assigment1?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(MONGO_URI, { 
    //....
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Initialize Apollo Server with type definitions and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }) // This allows you to pass the request context to your resolvers, useful for authentication
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`Apollo Server ready at ${url}`);
});
