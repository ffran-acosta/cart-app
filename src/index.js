//express
const express = require('express');
const app = express();
const {join} = require("path");

//json
app.use(express.json()); 

//server
const {port, start} = require('./modules/server');
app.listen(port, start())

//static
const statics = require("./modules/static");
app.use(statics(join(__dirname, "../public")));

//ejs
app.set("views", join(__dirname, "./views"));
app.set("view engine", "ejs");

//routes
app.use(require('./routes/cart.routes'))


