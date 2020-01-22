const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const videoRoutes = require('./backend/video.route');
const path = require('path')
const dotenv = require("dotenv").config();

const dburi = process.env.DB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(dburi, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, "client", "build")))


app.use('/api/video', videoRoutes);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});