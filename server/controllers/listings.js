import db from '../db.js';

const query = {
  run: (sql, params = []) => new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  }),
  get: (sql, params = []) => new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => err ? reject(err) : resolve(row));
  }),
  all: (sql, params = []) => new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => err ? reject(err) : resolve(rows));
  })
};

export const createListing = async (req, res) => {
  const { title, category, description, location, weightKg, pricePerKg } = req.body;
  const sellerId = req.user.id;

  try {
    const sql = `INSERT INTO listings (seller_id, title, category, description, location, weight_kg, price_per_kg)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const result = await query.run(sql, [sellerId, title, category, description, location, weightKg, pricePerKg]);
    const listingId = result.lastID;

    if (req.files && req.files.length > 0) {
      const imageSql = `INSERT INTO listing_images (listing_id, file_path) VALUES (?, ?)`;
      const insertPromises = req.files.map(file => {
        return query.run(imageSql, [listingId, `/uploads/${file.filename}`]);
      });

      await Promise.all(insertPromises);
    }

    res.status(201).json({ message: 'Listing created successfully', listingId });
  } catch (err) {
    res.status(500).json({ error: 'Database transaction failed: ' + err.message });
  }
};

export const getListings = async (req, res) => {
  try {
    const { sellerId } = req.query;

    let sql = `
      SELECT l.*, u.full_name as seller_name
      FROM listings l
      JOIN users u ON l.seller_id = u.id
    `;
    const params = [];

    if (sellerId) {
      sql += ` WHERE l.seller_id = ? `;
      params.push(sellerId);
    }

    sql += ` ORDER BY l.created_at DESC`;

    const rows = await query.all(sql, params);

    const listingsWithImages = await Promise.all(rows.map(async (listing) => {
      const images = await query.all(`SELECT file_path FROM listing_images WHERE listing_id = ?`, [listing.id]);
      listing.images = images.map(img => img.file_path);
      return listing;
    }));

    res.json(listingsWithImages);
  } catch (err) {
    res.status(500).json({ error: 'Query failed: ' + err.message });
  }
};

export const getListingById = async (req, res) => {
  const { id } = req.params;

  try {
    const sql = `
      SELECT l.*, u.full_name as seller_name
      FROM listings l
      JOIN users u ON l.seller_id = u.id
      WHERE l.id = ?
    `;

    const listing = await query.get(sql, [id]);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });

    const images = await query.all(`SELECT file_path FROM listing_images WHERE listing_id = ?`, [id]);
    listing.images = images.map(img => img.file_path);

    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: 'Database query failed: ' + err.message });
  }
};

export const acceptListing = async (req, res) => {
  const listingId = req.params.id;
  const recyclerId = req.user.id;
  const { date, time, notes } = req.body;

  const pickupId = `PU-${listingId}-${Date.now().toString().slice(-6)}`;

  try {
    await query.run('BEGIN TRANSACTION');

    const updateSql = `UPDATE listings SET status = 'pending' WHERE id = ? AND status = 'available'`;
    const updateResult = await query.run(updateSql, [listingId]);

    if (updateResult.changes === 0) {
      await query.run('ROLLBACK');
      return res.status(409).json({ error: 'Conflict: This listing is no longer available' });
    }

    const insertSql = `INSERT INTO pickups (id, listing_id, recycler_id, scheduled_date, scheduled_time, notes)
                       VALUES (?, ?, ?, ?, ?, ?)`;
    await query.run(insertSql, [pickupId, listingId, recyclerId, date, time, notes]);

    await query.run('COMMIT');
    res.status(200).json({ message: 'Listing successfully secured', pickupId });
  } catch (err) {
    await query.run('ROLLBACK').catch(() => {});
    res.status(500).json({ error: 'Database transaction failed: ' + err.message });
  }
};
