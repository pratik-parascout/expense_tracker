const express = require('express');
const router = express.Router();
const mainController = require('../controllers/home');

router.post('/', mainController.postHome);

router.get('/', mainController.getHome);

router.get('/expenses', mainController.getExpenses);

router.post('/delete-expense', mainController.deleteExpense);

module.exports = router;
