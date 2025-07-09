require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


const merge = require('lodash.merge');
const companyResolvers = require('./resolvers/company');
const userResolvers = require('./resolvers/user');
const workOrderResolvers = require('./resolvers/workOrder');

// Modular typeDefs
const typeDefs = [
  require('./typeDefs/company'),
  require('./typeDefs/user'),
  require('./typeDefs/workOrder'),
  require('./typeDefs/root'),
];



const resolvers = merge(
  {},
  companyResolvers,
  userResolvers,
  workOrderResolvers
);


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ prisma })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
