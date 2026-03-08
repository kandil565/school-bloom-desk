import { seedDatabase } from './src/utils/seedData.js';

console.log('Starting seed...');

try {
  const result = await seedDatabase();
  console.log('✅ Seed completed successfully!');
  console.log(result);
  process.exit(0);
} catch (error) {
  console.error('❌ Seed error:', error.message);
  console.error(error);
  process.exit(1);
}
