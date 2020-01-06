const mongoose = require('mongoose');
// console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    db => {
      console.log("MONGODB LISTEN");


    })
  .catch(err => console.log("ERROR MONGODB"))