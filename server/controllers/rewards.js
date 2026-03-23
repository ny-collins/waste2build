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

export const getMyRewards = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await query.get(`SELECT points FROM users WHERE id = ?`, [userId]);

    const myCoupons = await query.all(`
      SELECT c.*, r.redeemed_at
      FROM redemptions r
      JOIN coupons c ON r.coupon_id = c.id
      WHERE r.user_id = ?
      ORDER BY r.redeemed_at DESC
    `, [userId]);

    res.json({ points: user.points, redeemedCoupons: myCoupons });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch rewards data' });
  }
};

export const getAvailableCoupons = async (req, res) => {
  try {
    const coupons = await query.all(`SELECT * FROM coupons WHERE status = 'active'`);
    res.json(coupons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch coupon catalog' });
  }
};

export const redeemCoupon = async (req, res) => {
  const userId = req.user.id;
  const { couponId } = req.body;

  try {
    await query.run('BEGIN TRANSACTION');

    const user = await query.get(`SELECT points FROM users WHERE id = ?`, [userId]);
    const coupon = await query.get(`SELECT point_cost, status FROM coupons WHERE id = ?`, [couponId]);

    if (!coupon || coupon.status !== 'active') {
      await query.run('ROLLBACK');
      return res.status(400).json({ error: 'Coupon is invalid or no longer available' });
    }

    if (user.points < coupon.point_cost) {
      await query.run('ROLLBACK');
      return res.status(400).json({ error: 'Insufficient points balance' });
    }

    await query.run(`UPDATE users SET points = points - ? WHERE id = ?`, [coupon.point_cost, userId]);
    await query.run(`UPDATE coupons SET status = 'redeemed' WHERE id = ?`, [couponId]);
    await query.run(`INSERT INTO redemptions (user_id, coupon_id) VALUES (?, ?)`, [userId, couponId]);
    await query.run('COMMIT');
    res.status(200).json({ message: 'Coupon redeemed successfully!' });
  } catch (err) {
    await query.run('ROLLBACK').catch(() => {});
    console.error(err);
    res.status(500).json({ error: 'Transaction failed: ' + err.message });
  }
};
