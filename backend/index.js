require("dotenv").config();
const express = require("express");
const app = express();
const router = express.Router();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const port = 4000
const fs = require("fs")
const path = require('path');
const fileUpload = require('express-fileupload');

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

var cors = require('cors');

app.use(cors({
  origin:[""],
  methods:["POST","GET"],
  credentials:false
}));

// app.use(cors())

const directoryPath = path.join(__dirname, 'src/routes');
const files = (router) => {

  fs.readdirSync(directoryPath).filter(function (file) {
    require(path.join(directoryPath, file))(router);
  });

}
files(router)
app.use("/", router)

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, (req, res) => {
  console.log(`server is runnig on ${port} port`);

});

