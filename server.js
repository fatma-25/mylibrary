const express = require("express");
const connectdb = require("./config/db");
const passport = require("passport");
const app = express();
const fs = require('fs');

const fileUpload = require('express-fileupload');

// Middleware
// body & header parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// passport
app.use(passport.initialize());
require("./middleware/passport")(passport);
//connect db
connectdb();
//Route Api
app.use("/user", require("./routes/users"));
// app.use("/book", require("./routes/books"));
app.use("/bookList", require("./routes/booksList"));

//Run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, err =>
  console.log(err ? "error server" : `server is running on port ${PORT}`)
);

// Upload 
app.use(fileUpload());

app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;


  
  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ filename: file.name, filePath: `/uploads/${file.name}` });
  });
});


// Uploadimage
// app.use(fileUpload());

app.post('/uploadimage', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;


  
  file.mv(`${__dirname}/client/public/image/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ imagename: file.name, imagePath: `/image/${file.name}` });
  });
});

// //image reader

// app.get(`/image/:fileName`, (req, res) => {
//   // console.log("ggggg",req.params.fileName)
//   var file = fs.createReadStream(`${__dirname}/client/public/image/${req.params.fileName}`)
//   file.pipe(res);
// })








//pdfparser

// const fs = require('fs');
// const pdf = require('pdf-parse');
 
// let dataBuffer = fs.readFileSync(`${__dirname}/client/public/uploads/bac-pratique-2016-tic.pdf`);
 
// pdf(dataBuffer).then(function(data) {
 
//     // number of pages
//     console.log(data.numpages);
//     // number of rendered pages
//     console.log(data.numrender);
//     // PDF info
//     console.log(data.info);
//     // PDF metadata
//     console.log(data.metadata); 
//     // PDF.js version
//     // check https://mozilla.github.io/pdf.js/getting_started/
//     console.log(data.version);
//     // PDF text
//     console.log(data.text); 
        
// });

//pdf reader

app.get(`/pdf/:fileName`, (req, res) => {
  // var file = fs.createReadStream(`${__dirname}/client/public/uploads/bac-pratique-2016-tic.pdf`)


  var file = fs.createReadStream(`${__dirname}/client/public/uploads/${req.params.fileName}`)
  file.pipe(res);
})