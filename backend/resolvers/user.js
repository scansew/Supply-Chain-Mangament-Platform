const { hashPassword } = require('../auth/password');
const { isAuthenticated, hasRole } = require('../middleware/auth');

module.exports = {
  Query: {
    users: (_, __, { prisma }) => prisma.user.findMany(),
    user: (_, { id }, { prisma }) => prisma.user.findUnique({ 
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        family_name: true,
        given_name: true,
        role: true,
        companyId: true,
        companyName: true,
        createdAt: true,
        updatedAt: true
      }
    }),
    // Get current authenticated user
    me: (_, __, { prisma, user }) => {
      if (!user) return null;
      return prisma.user.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          username: true,
          email: true,
          family_name: true,
          given_name: true,
          role: true,
          companyId: true,
          companyName: true,
          createdAt: true,
          updatedAt: true
        }
      });
    },
  },
  Mutation: {
    createUser: async (_, { password, ...data }, { prisma }) => {
      // Hash password if provided
      const hashedPassword = password ? await hashPassword(password) : undefined;
      
      return prisma.user.create({ 
        data: { 
          ...data,
          password: hashedPassword 
        },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          companyId: true,
          companyName: true,
          createdAt: true,
          updatedAt: true
        }
      });
    },
    
    updateUser: async (_, { id, password, ...data }, { prisma, user }) => {
      // Only allow users to update their own profile unless they're an admin
      if (user.id !== id && user.role !== 'sAdmin') {
        throw new Error('Not authorized to update this user');
      }
      
      // Hash new password if provided
      const hashedPassword = password ? await hashPassword(password) : undefined;
      
      return prisma.user.update({ 
        where: { id },
        data: { 
          ...data,
          ...(hashedPassword && { password: hashedPassword })
        },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          companyId: true,
          companyName: true,
          createdAt: true,
          updatedAt: true
        }
      });
    },
    
    deleteUser: (_, { id }, { prisma, user }) => {
      // Only allow admins to delete users or users to delete themselves
      if (!user || (user.role !== 'sAdmin' && user.id !== id)) {
        throw new Error('Not authorized to delete this user');
      }
      
      return prisma.user.delete({ 
        where: { id },
        select: { id: true }
      });
    },
  },
  
  User: {
    company: (parent, _, { prisma }) => 
      parent.companyId ? prisma.company.findUnique({ 
        where: { id: parent.companyId } 
      }) : null,
  },
};
