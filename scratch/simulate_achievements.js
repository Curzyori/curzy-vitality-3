const { initDatabase } = require('../src/database/init');
const db = initDatabase();

const today = new Date().toISOString().split('T')[0];

const logs = [
  // Early Bird (06:30)
  {
    timestamp: `${today} 06:30:00`,
    process_name: 'VS Code',
    category: 'development',
    duration: 300,
    day_id: today
  },
  // Night Owl (23:30)
  {
    timestamp: `${today} 23:30:00`,
    process_name: 'VS Code',
    category: 'development',
    duration: 300,
    day_id: today
  },
  // Deep Focus (2.5 hours)
  {
    timestamp: `${today} 14:00:00`,
    process_name: 'IntelliJ IDEA',
    category: 'development',
    duration: 9000,
    day_id: today
  }
];

const stmt = db.prepare(`
  INSERT INTO activity_logs (timestamp, process_name, category, duration, day_id)
  VALUES (@timestamp, @process_name, @category, @duration, @day_id)
`);

console.log('Injecting simulation data...');
for (const log of logs) {
  stmt.run(log);
}
console.log('Simulation data injected. Refresh your dashboard to see the badges!');

db.close();
