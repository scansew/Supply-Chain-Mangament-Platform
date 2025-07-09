const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Companies
  const company1 = await prisma.company.create({ data: { name: 'Acme Corp', address: '123 Main St', companySecret: 'secret1' } });
  const company2 = await prisma.company.create({ data: { name: 'Beta LLC', address: '456 Side Ave', companySecret: 'secret2' } });

  // Users
  const user1 = await prisma.user.create({ data: { username: 'alice', email: 'alice@example.com', companyId: company1.id } });
  const user2 = await prisma.user.create({ data: { username: 'bob', email: 'bob@example.com', companyId: company2.id } });

  // WorkOrders
  await prisma.workOrderCounter.upsert({
    where: { counterName: 'workOrder' },
    update: { currentValue: 2 },
    create: { counterName: 'workOrder', currentValue: 2 },
  });
  await prisma.workOrder.create({ data: { woNumber: 1, createdById: user1.id, companyId: company1.id, status: 'PENDING', details: 'First order' } });
  await prisma.workOrder.create({ data: { woNumber: 2, createdById: user2.id, companyId: company2.id, status: 'IN_PROGRESS', details: 'Second order' } });
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
