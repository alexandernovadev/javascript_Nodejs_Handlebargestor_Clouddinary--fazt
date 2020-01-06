const { Schema, model } = require('mongoose')

const Photo = new Schema({
  title: String,
  description: String,
  imageURL: String,
  public_id: String
});

// public_id: Es el name de la imagen que me da Cloudinary

module.exports = model('Photo', Photo);