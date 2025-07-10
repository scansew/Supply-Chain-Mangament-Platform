const { PrismaClient } = require('@prisma/client');
const { generateToken } = require('../auth/jwt');
const { hashPassword, comparePasswords } = require('../auth/password');

const prisma = new PrismaClient();

const authResolvers = {
  Mutation: {
    signUp: async (_, { input }) => {
      const { email, password, username, givenName, familyName, role, ...rest } = input;
      
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });
      
      if (existingUser) {
        throw new Error('User already exists with this email');
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create user with mapped fields
      const user = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
          given_name: givenName,
          family_name: familyName,
          role,
          ...rest
        }
      });

      // Generate JWT token
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role
      });

      return {
        token,
        user: {
          ...user,
          password: null // Don't send password back
        }
      };
    },

    login: async (_, { email, password }) => {
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isValid = await comparePasswords(password, user.password);

      if (!isValid) {
        throw new Error('Invalid credentials');
      }

      // Generate JWT token
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role
      });

      return {
        token,
        user: {
          ...user,
          password: null // Don't send password back
        }
      };
    }
  }
};

module.exports = authResolvers;
