const db = require('../config/db');

// 🛒 Place a new order
exports.placeOrder = (req, res) => {
    const { customer_name, table_number, items } = req.body;
    const restaurant_id = req.user.restaurant_id;

    db.query(
        "INSERT INTO orders (customer_name, table_number, restaurant_id) VALUES (?, ?, ?)",
        [customer_name, table_number, restaurant_id],
        (err, result) => {
            if (err) return res.status(500).json(err);

            const orderId = result.insertId;
            const values = items.map(item => [orderId, item.menu_id, item.quantity, item.special_instructions || ""]);

            db.query(
                "INSERT INTO order_items (order_id, menu_id, quantity, special_instructions) VALUES ?",
                [values],
                (err2) => {
                    if (err2) return res.status(500).json(err2);
                    res.json({ message: "Order placed", order_id: orderId });
                }
            );
        }
    );
};

// 👀 Get all orders (by restaurant)
exports.getOrders = (req, res) => {
    const restaurant_id = req.user.restaurant_id;

    db.query(
        "SELECT * FROM orders WHERE restaurant_id = ? ORDER BY created_at DESC",
        [restaurant_id],
        (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results);
        }
    );
};

// 🍳 Update order status (e.g., to cooking, half_done, completed)
exports.updateStatus = (req, res) => {
    const { order_id, status } = req.body;

    db.query(
        "UPDATE orders SET status = ? WHERE id = ?",
        [status, order_id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Order status updated" });
        }
    );
};
