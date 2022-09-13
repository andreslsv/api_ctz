const express = require('express'), morgan = require('morgan'),config = require('./configs/config');;

var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const { listen } = require('express/lib/application');
const app = express();

require('./db');
require('./asociations');

//Settings
app.set('port', process.env.PORT || 3000);//Si no tiene puerto habilitado, usará el 3000 por defecto
app.set('json spaces', 2);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));//Solo recibe data sencilla(No imágenes)
app.use(express.json());
app.use(bodyParser.json());
app.set('llave', config.llave);

//Middlewar jwt
const rutasProtegidas = express.Router(); 
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];
 
    if (token) {
      jwt.verify(token, app.get('llave'), (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 });


//Rutas
var login = require('./routes/login.js');
app.use(require('./routes/login.js',login));

var user = require('./routes/user.js');
app.use('/api/',rutasProtegidas,require('./routes/user.js',user));


//Arrancando el servidor en el puerto 3000
app.listen(app.get('port'),()=>{
    console.log('Servidor cargado en el puesto 3000');
});