const { Router } = require('express');
const Photo = require("../models/Photo");

const fs = require('fs-extra');

const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_KEY_SECRET
});

const router = Router();

// Mostrar Images
router.get('/', async (req, res) => {

  const photos = await Photo.find()
  res.render('images', { photos })
});


router.get('/images-add', async (req, res) => {
  //Pinta image_form de hbs
  // No hay que poner .hbs porque ya esta configurado para eschuchaer este
  // tipo de archivos

  const photos = await Photo.find()
  res.render('image_form', { photos })
});


router.get('/delete/:id/:id_image', async (req, res) => {

  await Photo.deleteOne({ _id: req.params.id }, (err) => {


  })
  await cloudinary.v2.api.delete_resources(req.params.id_image);

  res.redirect('/')
});

router.post('/images/add', async (req, res) => {

  const { title, description } = req.body;


  // Aqui se sube la imagen a cloudinary
  // Recibe el path donde esta la imageen
  // y se puede como segundo una config VER DOC

  const PHOTOCLOUD = await cloudinary.v2.uploader.upload(req.file.path);

  /* SE PEUDE TRANSFORMAR
  const PHOTOCLOUD = await cloudinary.v2.uploader.upload(req.file.path,
    {
      eager: [
        { width: 400, height: 300, crop: "pad" },
        { width: 260, height: 200, crop: "crop", gravity: "north" }]
    });
  */

  // PHOTOCLOUD: me vota una resultado

  console.log(PHOTOCLOUD);

  const newPhoto = new Photo({
    title,
    description,
    imageURL: PHOTOCLOUD.url,
    public_id: PHOTOCLOUD.public_id
  });


  // Save en MONGO DB
  await newPhoto.save();


  //console.log(req.body);

  /* ACA recibimos gracias gracias a la propidad name 
  un json con esos datos
  */

  //console.log(req.file);
  /* Aca recibimos la imagen, que paso por el muter midleware para
  poder ser procesada*/




  /* Eliminar Imagen del servidor
  porque ya se subio a cloudInary*/

  await fs.unlink(req.file.path);


  return res.redirect('/')
})

module.exports = router;