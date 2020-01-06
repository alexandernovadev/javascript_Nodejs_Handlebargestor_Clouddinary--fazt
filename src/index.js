// Requerir las varubales de entorno
// Lee las variables de entorno

// Si No estoy en production pues para que modulo
// Ya que en produccion ya esta modulo de la NUBE}

if (process.env.NODE_ENV !== 'production') {

  // process.env.NODE_ENV !== 'production' -> Si no esta en produccion
  require('dotenv').config();
}
// Esto se ejecuta en entorno de desarrollo y produccion
// En produccion NO SIRVE, PORQUE PUES NO ESTA DESPLEGADA


const app = require('./app');


app.listen(app.get('port'), () => {
  console.log("SERVER ON " + app.get('port'));
  console.log("MODE: ", process.env.NODE_ENV);

});