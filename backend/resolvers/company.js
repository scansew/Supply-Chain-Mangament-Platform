module.exports = {
  Query: {
    companies: (_, __, { prisma }) => prisma.company.findMany(),
    company: (_, { id }, { prisma }) => prisma.company.findUnique({ where: { id } }),
  },
  Mutation: {
    createCompany: (_, args, { prisma }) => prisma.company.create({ data: args }),
    updateCompany: (_, { id, ...data }, { prisma }) => prisma.company.update({ where: { id }, data }),
    deleteCompany: (_, { id }, { prisma }) => prisma.company.delete({ where: { id } }),
  },
  Company: {
    users: (parent, _, { prisma }) => prisma.user.findMany({ where: { companyId: parent.id } }),
    workOrders: (parent, _, { prisma }) => prisma.workOrder.findMany({ where: { companyId: parent.id } }),
  },
};
