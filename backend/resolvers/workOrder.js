module.exports = {
  Query: {
    workOrders: (_, __, { prisma }) => prisma.workOrder.findMany(),
    workOrder: (_, { id }, { prisma }) => prisma.workOrder.findUnique({ where: { id } }),
  },
  Mutation: {
    // createWorkOrder with auto-incremented woNumber
    createWorkOrder: async (_, args, { prisma }) => {
      // Find or create the counter
      const counterName = 'workOrder';
      const counter = await prisma.workOrderCounter.upsert({
        where: { counterName },
        update: { currentValue: { increment: 1 } },
        create: { counterName, currentValue: 1 },
      });
      const woNumber = counter.currentValue;
      return prisma.workOrder.create({ data: { ...args, woNumber } });
    },
    updateWorkOrder: (_, { id, ...data }, { prisma }) => prisma.workOrder.update({ where: { id }, data }),
    deleteWorkOrder: (_, { id }, { prisma }) => prisma.workOrder.delete({ where: { id } }),
  },
  WorkOrder: {
    company: (parent, _, { prisma }) => parent.companyId ? prisma.company.findUnique({ where: { id: parent.companyId } }) : null,
    createdBy: (parent, _, { prisma }) => prisma.user.findUnique({ where: { id: parent.createdById } }),
    assignedTo: (parent, _, { prisma }) => parent.assignedToId ? prisma.user.findUnique({ where: { id: parent.assignedToId } }) : null,
  },
};
