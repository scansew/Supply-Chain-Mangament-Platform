module.exports = {
  Query: {
    users: (_, __, { prisma }) => prisma.user.findMany(),
    user: (_, { id }, { prisma }) => prisma.user.findUnique({ where: { id } }),
  },
  Mutation: {
    createUser: (_, args, { prisma }) => prisma.user.create({ data: args }),
    updateUser: (_, { id, ...data }, { prisma }) => prisma.user.update({ where: { id }, data }),
    deleteUser: (_, { id }, { prisma }) => prisma.user.delete({ where: { id } }),
  },
  User: {
    company: (parent, _, { prisma }) => parent.companyId ? prisma.company.findUnique({ where: { id: parent.companyId } }) : null,
  },
};
