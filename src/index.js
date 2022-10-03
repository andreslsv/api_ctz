const express = require('express'), morgan = require('morgan'),config = require('./configs/config'),cors = require('cors');

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
app.use(express.urlencoded({extended:true}));//Solo recibe data sencilla(No imágenes)
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.json());
app.set('llave', config.llave);

app.use(cors());


//Middlewar jwt
const rutasProtegidas = express.Router(); 
rutasProtegidas.use((req, res, next) => {
    const token = req.headers.authorization.split(' ').slice(-1).pop();
 
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

var concreto = require('./routes/concreto.js');
app.use('/api/',rutasProtegidas,require('./routes/concreto.js',concreto));

var pedido = require('./routes/pedido.js');
app.use('/api/',rutasProtegidas,require('./routes/pedido.js',pedido));

var cliente = require('./routes/cliente.js');
app.use('/api/',rutasProtegidas,require('./routes/cliente.js',cliente));

var conductor = require('./routes/conductor.js');
app.use('/api/',rutasProtegidas,require('./routes/conductor.js',conductor));

var vendedor = require('./routes/vendedor.js');
app.use('/api/',rutasProtegidas,require('./routes/vendedor.js',vendedor));

var pago = require('./routes/pago.js');
app.use('/api/',rutasProtegidas,require('./routes/pago.js',pago));

var credito = require('./routes/credito.js');
app.use('/api/',rutasProtegidas,require('./routes/credito.js',credito));

var cierre = require('./routes/cierre.js');
app.use('/api/',rutasProtegidas,require('./routes/cierre.js',cierre));

var despacho = require('./routes/despacho.js');
app.use('/api/',rutasProtegidas,require('./routes/despacho.js',despacho));


//Arrancando el servidor en el puerto 3000
app.listen(app.get('port'),()=>{
    console.log('Servidor cargado en el puesto 3000');
});