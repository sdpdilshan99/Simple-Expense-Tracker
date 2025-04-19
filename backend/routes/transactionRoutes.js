const express = require('express');
const transactionController = require('../controllers/transactionController');
const router = express.Router();

router.get("/", transactionController.getAllTransactions);
router.post("/add", transactionController.addTransaction);

module.exports = router;