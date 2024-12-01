const path = require('path');

const Expense = require('../models/expense');

exports.postHome = (req, res, next) => {
  const { amount, description, category } = req.body;

  if (!amount || !description) {
    return res
      .status(400)
      .json({ message: 'Amount and Description are required' });
  }

  Expense.create({ amount, description, category })
    .then((result) => {
      console.log('Expense Created');
      res.json(result);
    })
    .catch((err) => {
      console.error('Error creating expense:', err);
      res.status(500).json({ message: 'Error saving expense' });
    });
};

exports.getHome = (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
};

exports.getExpenses = (req, res, next) => {
  Expense.findAll()
    .then((expenses) => {
      res.json({ success: true, data: expenses });
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.deleteExpense = (req, res, next) => {
  const expId = req.body.id;
  //   console.log(expId);
  Expense.destroy({ where: { id: expId } })
    .then((res) => {
      console.log('Expense Deleted');
    })
    .catch((err) => {
      console.log(err);
    });
};
