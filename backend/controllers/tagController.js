const db = require("../config/db");


const getAllTags = (req, res, next) => {
    const query = 'SELECT * FROM tags';

    db.query(query, (error, result) => {
        if(error){
            return next(error);
        }
        res.status(200).json(result);
        console.log(result)

    });
}

const addTag = (req, res, next) => {
    const { title, color } = req.body;

    if (!title || !color) {
        return res.status(400).json({ error: 'Title and color are required' });
    }

    const checkQuery = 'SELECT * FROM tags WHERE title = ?';
    db.query(checkQuery, [title], (error, result) => {
        if (error) {
            console.error('Database error during tag check:', error); 
            return next(error); 
        }

        if (result.length > 0) {
            return res.status(400).json({ error: 'Tag with this title already exists' });
        }

        const insertQuery = 'INSERT INTO tags (title, color) VALUES (?, ?)';
        db.query(insertQuery, [title, color], (error, result) => {
            if (error) {
                console.error('Database error during tag insertion:', error); 
                return next(error); 
            }

            console.log('Tag added successfully:', result); 
            res.status(201).json({ message: 'Tag added successfully', tagId: result.insertId });
        });
    });
};


const deleteTag = (req, res) => {
    const {id} = req.params;

    const query = 'DELETE FROM tags WHERE id = ?';
    db.query(query, [id], (error, result) => {
        if (error) {
            return next(error);
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
            return next(error);
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        res.json({ id, title, color });
    })
}


module.exports = {getAllTags, addTag, deleteTag, editTag};