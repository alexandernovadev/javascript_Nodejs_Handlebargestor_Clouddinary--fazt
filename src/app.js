// Vamos a configurar express a la antigua

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const exphbs = require('express-handlebars');


// Initialization

const app = express();
// Traer la base de datos
require('./database');


// Settings
app.set('port', process.env.PORT || 3000);

//Le dice donde esta la carpeta de views
app.set('views', path.join(__dirname, 'views'));

// Esto es como un Mini framework para Frontendiar

/*
Se llama asi el framework
app.engine( 
  1. .hbs -> Registar las vistas, tienen formato .hbs
  2. La funcion de 'exphbs()
      que recibe unos parametros de configuracion
      {
        defaultLayout: 'main'

        layoutsDir: path.join(app.get('views'), 'layouts'),
        // app.get('views') -> es el path de view pero arriba
        ya hize un dirname para saber donde esta

        partialsDir: path.join(app.get('views'), 'partials'),
        // both above but con la folder partial

        extname: '.hbs'
        // La extension pero arriba tambien esta alpie del engine
      }
)


*/
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));

// Darle el motor de las vistas
app.set('view engine', '.hbs');

// Middlewares

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Solo entieda Strings

// Multer coloca las imagenes en public/uploads

// filename -> Tener la info de la imagen que llega
//recibe la rta, el archvi, y una funcion callback
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb) => {

    // Error, name de la imagen
    // El segundo parametro le coloco una name unico con la extension
    cb(null, new Date().getTime() + path.extname(file.originalname))
  }
});


// Sabe subir imagenes al servidor
/* .single(AQUI NAME DE LA PROPIEDAD QUE LLEGA DESDE EL FORMULARIO) */
app.use(multer({ storage }).single('image'));


// Rutas

// Asi tan de one lo va metiendo el require WOOOUU
app.use(require('./routes'))
// Si en routes de llamma index.js NODE sabe y lo llama
// Si no se llamara index.js 
// Tocaria asi  require('./routes/namearchivo')

module.exports = app;