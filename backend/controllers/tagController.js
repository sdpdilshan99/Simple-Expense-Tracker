const db = require("../config/db");


const getAllTags = (req, res, next) => {
    const query = 'SELECT * FROM tags';

    db.query(query, (error, result) => {
        if(error){
            return res.status(500).json({error: error.message});
        }
        res.status(200).json(result);
        console.log(result)

    });
}

const addTag = (req, res, next) => {
    const {title, color} = req.body;

    if(!title|| !color){
        return res.status(400).json({ error: 'Title and color are required' });
    }

    const query = 'INSERT INTO tags (title, color) VALUES (?, ?)';
    db.query(query, [title, color], (error, result) => {
        if(error){
            return res.status(500).json({ error: error.message });
        }
        console.log(result);
        res.status(201).json({ message: 'Tag added successfully', tagId: result.insertId });
    });
    
}

const deleteTag = (req, res) => {
    const {id} = req.params;

    const query = 'DELETE FROM tags WHERE id = ?';
    db.query(query, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Tag not found' });
        }

        res.status(200).json({ message: 'Tag deleted successfully' });
    })
}

const editTag = (req, res) =>{
    const {id} = req.params;
    const {title, color} = req.body;

    if (!title || !color) {
        return res.status(400).json({ error: 'Title and color are required' });
      }

    const query = 'UPDATE tags SET title = ?, color = ? WHERE id = ?';
    db.query(query, [title, color, id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        res.json({ id, title, color });
    })
}


module.exports = {getAllTags, addTag, deleteTag, editTag};