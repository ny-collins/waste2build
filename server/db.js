import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error opening database:', err);
  } else {
    console.log('[DB] SQLite connection established successfully.');
  }
});

db.serialize(() => {
  db.run('PRAGMA foreign_keys = ON');

  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('seller', 'recycler', 'admin')),
    points INTEGER DEFAULT 0, -- NEW: Reward points balance
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

  db.run(`CREATE TABLE IF NOT EXISTS coupons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL CHECK(type IN ('Airtime', 'Voucher', 'Gift Card')),
    brand TEXT NOT NULL,
    amount INTEGER NOT NULL,
    point_cost INTEGER NOT NULL, -- How many points it costs to redeem
    code TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'active' CHECK(status IN ('active', 'redeemed', 'expired')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS redemptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    coupon_id INTEGER NOT NULL,
    redeemed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (coupon_id) REFERENCES coupons(id)
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
  )`, () => {
    console.log('[DB] Relational schemas verified and mounted.');
  });

  db.get("SELECT COUNT(*) as count FROM coupons", (err, row) => {
    if (row && row.count === 0) {
      console.log("[DB] Empty catalog detected. Provisioning initial rewards...");
      const stmt = db.prepare(`
        INSERT INTO coupons (type, brand, amount, point_cost, code) 
        VALUES (?, ?, ?, ?, ?)
      `);

      stmt.run(['Airtime', 'MTN', 500, 50, 'WTB-MTN-500']);
      stmt.run(['Voucher', 'Shoprite', 5000, 500, 'WTB-SHOP-5K']);
      stmt.run(['Gift Card', 'Amazon', 10000, 1000, 'WTB-AMZ-10K']);
      stmt.finalize();
    }
  });
});

export default db;
