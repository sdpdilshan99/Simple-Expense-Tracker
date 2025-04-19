const db = require('../config/db');


const getAllTransactions = (req, res, next) => {
    const query = `
        SELECT t.*, GROUP_CONCAT(JSON_OBJECT('title', tg.title, 'color', tg.color)) AS tags
        FROM transactions t
        LEFT JOIN transaction_tags tt ON t.id = tt.transaction_id
        LEFT JOIN tags tg ON tg.id = tt.tag_id
        GROUP BY t.id
        ORDER BY t.date DESC
    `;

    db.query(query, (error, result) => {
        if(error){
            return res.status(500).json({ error: error.message });
        }

        const formatted = result.map((row) => ({
            ...row,
            tags: row.tags ? JSON.parse(`[${row.tags}]`) : []
        }));
        res.status(200).json(formatted)
    })
}

const addTransaction = (req, res, next) => {
    const {type, description, amount, date, tags} = req.body;

    if (!type || !amount || !date) {
        return res.status(400).json({ error: "Type, amount, and date are required" });
    }

    if (!tags || !Array.isArray(tags) || tags.length === 0) {
        return res.status(400).json({ error: "At least one tag is required" });
    }

    const query = `INSERT INTO transactions (type, description, amount, date) VALUES (?, ?, ?, ?)`;
    
    db.query(query, [type,description, amount, date], (error, result) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        const transactionId = result.insertId;

        const values = tags.map((tagId) => [transactionId, tagId]);

            const q = 'INSERT INTO transaction_tags (transaction_id, tag_id) VALUES ?';
            db.query(q, [values], (error2, result2) => {
                if(error2){
                    return res.status(500).json({ error: error2.message });
                }
                res.status(201).json({message: "Transaction added", id: transactionId});
            });
         
    })
}


module.exports = {getAllTransactions, addTransaction};