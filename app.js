const express = require('express');
const path = require('path');

const cors = require('cors');
const bodyParser = require('body-parser');

const homeRoutes = require('./routes/home');
const sequelize = require('./utils/database');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/home', homeRoutes);

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
