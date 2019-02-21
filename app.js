const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const authRoutes = require('./routes/auth');
const mainRoutes = require('./routes/main');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(`mongodb://localhost:27017/test`, { useNewUrlParser: true })
  .then(console.log('Successful connection to database'))
  .catch(error => {
    console.log(`The following error occurred: ${error.message}`)
})

app.use(authRoutes);
app.use(mainRoutes);

app.listen(3000)
