const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

exports.register = async (req, res) => {
    const { name, email, password, role, restaurant_id } = req.body;
    const hash = await bcrypt.hash(password, 10);
    db.query("INSERT INTO users (name, email, password_hash, role, restaurant_id) VALUES (?, ?, ?, ?, ?)", 
        [name, email, hash, role, restaurant_id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "User registered" });
        });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err || results.length === 0) return res.status(400).json({ message: "User not found" });
        const user = results[0];
        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) return res.status(401).json({ message: "Invalid password" });
        const token = jwt.sign({ id: user.id, role: user.role, restaurant_id: user.restaurant_id }, "SECRET", { expiresIn: "1d" });
        res.json({ token });
    });
};
