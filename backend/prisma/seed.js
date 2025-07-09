const { PrismaClient } = require('@prisma/client');
const { hashPassword } = require('../auth/password');
const prisma = new PrismaClient();

async function main() {
  // Hash passwords
  const adminPassword = await hashPassword('admin123');
  const userPassword = await hashPassword('password123');

  // Create companies
  const company1 = await prisma.company.upsert({
    where: { companySecret: 'secret1' },
    update: {},
    create: { 
      name: 'Acme Corp', 
      address: '123 Main St', 
      companySecret: 'secret1' 
    },
  });

  const company2 = await prisma.company.upsert({
    where: { companySecret: 'secret2' },
    update: {},
    create: { 
      name: 'Beta LLC', 
      address: '456 Side Ave', 
      companySecret: 'secret2' 
    },
  });

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@scansew.com' },
    update: {},
    create: { 
      username: 'admin', 
      email: 'admin@scansew.com',
      password: adminPassword,
      role: 'sAdmin',
      given_name: 'Admin',
      family_name: 'User',
      companyId: company1.id,
      companyName: company1.name
    },
  });

  // Create regular users
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: { 
      username: 'alice', 
      email: 'alice@example.com', 
      password: userPassword,
      role: 'cAdmin',
      given_name: 'Alice',
      family_name: 'Johnson',
      companyId: company1.id,
      companyName: company1.name
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: { 
      username: 'bob', 
      email: 'bob@example.com', 
      password: userPassword,
      role: 'emp',
      given_name: 'Bob',
      family_name: 'Smith',
      companyId: company2.id,
      companyName: company2.name
    },
  });

  // Initialize work order counter
  await prisma.workOrderCounter.upsert({
    where: { counterName: 'workOrder' },
    update: { currentValue: 2 },
    create: { counterName: 'workOrder', currentValue: 2 },
  });

  // Create sample work orders
  await prisma.workOrder.createMany({
    data: [
      {
        woNumber: 1,
        createdById: adminUser.id,
        companyId: company1.id,
        status: 'PENDING',
        details: 'First order'
      },
      {
        woNumber: 2,
        createdById: user1.id,
        companyId: company2.id,
        status: 'IN_PROGRESS',
        details: 'Second order'
      },
      {
        woNumber: 3,
        createdById: user2.id,
        companyId: company1.id,
        status: 'COMPLETED',
        details: 'Third order'
      }
    ],
    skipDuplicates: true
  });

  console.log('Database has been seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
