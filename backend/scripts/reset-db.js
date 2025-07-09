const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');
const { hashPassword } = require('../auth/password');

async function resetDatabase() {
  console.log('🚀 Starting database reset...');
  
  try {
    console.log('1. Dropping and recreating the database...');
    execSync('npx prisma migrate reset --force', { stdio: 'inherit' });
    
    console.log('✅ Database reset completed successfully!');
    
    // Re-seed the database
    console.log('\n🌱 Seeding database with initial data...');
    execSync('node prisma/seed.js', { stdio: 'inherit' });
    
    console.log('\n✨ Database reset and seeded successfully!');
    console.log('\nAdmin credentials:');
    console.log('Email: admin@scansew.com');
    console.log('Password: admin123');
  } catch (error) {
    console.error('❌ Error resetting database:', error);
    process.exit(1);
  }
}

resetDatabase();
