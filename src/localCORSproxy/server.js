const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 80;

app.use(cors());
app.options("*", cors());

// ** Endpoint definition **

// expects header with key "url", returns webpage
app.get("/proxy", function (req, res) {
  let url = req.headers.url;
  axios
    .get(url)
    .then((proxyResponse) => {
      res.set("content-type", proxyResponse.headers["content-type"]);
      res.send(proxyResponse.data);
    })
    .catch((err) => res.send(err));
});

// start Server
app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`);
});
