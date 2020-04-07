"use strict";

const express = require("express");
// const cors = require('cors');

// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files
/**
 * Multer adds a body object and a file or files object to the request object.
 * The body object contains the values of the text fields of the form
 *  the file or files object contains the files uploaded via the form.
 */
const multer = require("multer");

var app = express();

// app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

// creating and instance of multer function
const upload = multer();
// End-Point to receive an uploaded file via an html form
// passing upload function as middleware to the end-point

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  res.send({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("App is listening...");
});
