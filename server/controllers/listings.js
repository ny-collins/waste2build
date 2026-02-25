import db from '../db.js';

export const createListing = (req, res) => {
  const { title, category, description, location, weightKg, pricePerKg } = req.body;
  const sellerId = req.user.id;

  const sql = `INSERT INTO listings (seller_id, title, category, description, location, weight_kg, price_per_kg) 
               VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.run(sql, [sellerId, title, category, description, location, weightKg, pricePerKg], function(err) {
    if (err) return res.status(500).json({ error: 'Database transaction failed: ' + err.message });
    
    const listingId = this.lastID;

    if (req.files && req.files.length > 0) {
      const imageSql = `INSERT INTO listing_images (listing_id, file_path) VALUES (?, ?)`;
      const stmt = db.prepare(imageSql);
      
      req.files.forEach(file => {
        stmt.run([listingId, `/uploads/${file.filename}`]);
      });
      stmt.finalize();
    }

    res.status(201).json({ message: 'Listing created successfully', listingId });
  });
};

export const getListings = (req, res) => {
  const sql = `
    SELECT l.*, u.full_name as seller_name 
    FROM listings l 
    JOIN users u ON l.seller_id = u.id 
    ORDER BY l.created_at DESC
  `;
  
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Query failed: ' + err.message });
    res.json(rows);
  });
};

// NEW: Fetch a single listing by ID, joining user data and aggregating images
export const getListingById = (req, res) => {
  const { id } = req.params;
  
  const sql = `
    SELECT l.*, u.full_name as seller_name 
    FROM listings l 
    JOIN users u ON l.seller_id = u.id 
    WHERE l.id = ?
  `;
  
  db.get(sql, [id], (err, listing) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    
    // Fetch associated images
    db.all(`SELECT file_path FROM listing_images WHERE listing_id = ?`, [id], (err, images) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch images' });
      
      listing.images = images.map(img => img.file_path);
      res.json(listing);
    });
  });
};

// NEW: Atomic Transaction to Accept a Listing
export const acceptListing = (req, res) => {
  const listingId = req.params.id;
  const recyclerId = req.user.id;
  const { date, time, notes } = req.body;

  // 1. Verify state integrity (prevent double-booking)
  db.get(`SELECT status FROM listings WHERE id = ?`, [listingId], (err, listing) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    if (listing.status !== 'available') return res.status(400).json({ error: 'This listing is no longer available' });

    const pickupId = `PU-${listingId}-${Date.now().toString().slice(-6)}`;

    // 2. Execute Atomic Transaction
    db.serialize(() => {
      db.run('BEGIN TRANSACTION');
      
      db.run(`UPDATE listings SET status = 'pending' WHERE id = ?`, [listingId], function(err) {
        if (err) {
          db.run('ROLLBACK');
          return res.status(500).json({ error: 'Failed to lock listing' });
        }
      });

      db.run(
        `INSERT INTO pickups (id, listing_id, recycler_id, scheduled_date, scheduled_time, notes) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [pickupId, listingId, recyclerId, date, time, notes],
        function(err) {
          if (err) {
            db.run('ROLLBACK');
            return res.status(500).json({ error: 'Failed to generate pickup record' });
          }
          
          db.run('COMMIT');
          res.status(200).json({ message: 'Listing accepted', pickupId });
        }
      );
    });
  });
};
