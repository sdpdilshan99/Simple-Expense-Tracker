const express = require('express');
const tagController = require('../controllers/tagController');
const router = express.Router();

router.get("/", tagController.getAllTags);
router.post("/add", tagController.addTag);
router.delete("/:id", tagController.deleteTag);
router.put("/:id", tagController.editTag);

module.exports = router;