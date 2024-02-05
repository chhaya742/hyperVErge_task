require("dotenv").config();
const express = require("express");
const app = express();
const router = express.Router();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const port = process.env.port
const fs = require("fs")
const path = require('path');
const fileUpload = require('express-fileupload');

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

var cors = require('cors');

app.use(cors({
  origin:["https://deploy-mern-lwhq.vercel.app"],
  methods:["POST","GET"],
  credentials:false
}));

const directoryPath = path.join(__dirname, 'src/routes');
const files = (router) => {

  fs.readdirSync(directoryPath).filter(function (file) {
    require(path.join(directoryPath, file))(router);
  });

}
files(router)
app.use("/", router)

app.get("/", () => {
  console.log(`server is runnig on ${port} port`);
})

app.listen(port, (req, res) => {
  console.log(`server is runnig on ${port} port`);

});