import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath);

const seedDatabase = async () => {
  console.log('🌱 Initiating database reset sequence...');

  db.serialize(() => {
    // 1. Enforce Schemas (DDL)
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('seller', 'recycler', 'admin')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS listings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      seller_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      location TEXT NOT NULL,
      weight_kg REAL NOT NULL,
      price_per_kg REAL NOT NULL,
      status TEXT DEFAULT 'available' CHECK(status IN ('available', 'pending', 'completed')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (seller_id) REFERENCES users(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS listing_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      listing_id INTEGER NOT NULL,
      file_path TEXT NOT NULL,
      FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS pickups (
      id TEXT PRIMARY KEY,
      listing_id INTEGER NOT NULL,
      recycler_id INTEGER NOT NULL,
      scheduled_date TEXT NOT NULL,
      scheduled_time TEXT NOT NULL,
      notes TEXT,
      status TEXT DEFAULT 'scheduled',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (listing_id) REFERENCES listings(id),
      FOREIGN KEY (recycler_id) REFERENCES users(id)
    )`);

    console.log('🏗️  Database schema verified/created.');

    // 2. Flush Tables (DML)
    db.run('DELETE FROM listing_images');
    db.run('DELETE FROM pickups');
    db.run('DELETE FROM listings');
    db.run('DELETE FROM users');
    console.log('🧹 Tables flushed.');
  });

  // 3. Generate Cryptographic Hash
  const saltRounds = 10;
  const hash = await bcrypt.hash('password123', saltRounds);

  // 4. Define Role Matrix
  const users = [
    { name: 'System Admin', email: 'admin@waste2build.local', role: 'admin' },
    { name: 'Sarah (Vendor)', email: 'seller@waste2build.local', role: 'seller' },
    { name: 'Acme Recycling', email: 'recycler@waste2build.local', role: 'recycler' }
  ];

  // 5. Execute Atomic Inserts
  db.serialize(() => {
    const stmt = db.prepare('INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)');
    
    let completed = 0;
    users.forEach((user) => {
      stmt.run([user.name, user.email, hash, user.role], function(err) {
        if (err) {
          console.error(`❌ Failed to insert ${user.role}:`, err.message);
        } else {
          console.log(`✅ Provisioned [${user.role}]: ${user.email}`);
        }
        
        completed++;
        if (completed === users.length) {
          stmt.finalize();
          console.log('\n✨ Database reset complete. Ready for E2E testing.');
          db.close();
        }
      });
    });
  });
};

seedDatabase();
