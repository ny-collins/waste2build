import db from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { fullName, email, password, role } = req.body;

  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const sql = `INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)`;
    db.run(sql, [fullName, email, hash, role], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(400).json({ error: 'Email already registered' });
        }
        return res.status(500).json({ error: 'Database transaction failed' });
      }

      const user = { id: this.lastID, fullName, email, role };
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.status(201).json({ user, token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server cryptography error' });
  }
};

export const login = (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const userData = {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      role: user.role
    };

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ user: userData, token });
  });
};
