const Sequelize = require('sequelize');

const userModule = require('./models/user.js');
const pedidoModule = require('./models/pedido.js');
//const clienteModule = require('./models/cliente.js');
const concretoModule = require('./models/concreto.js');
//const conductorModule = require('./models/conductor.js');
//const vendedorModule = require('./models/vendedor.js');
const cierreModule = require('./models/cierre.js');
const creditoModule = require('./models/credito.js');
const pagoModule = require('./models/pago.js');
const bancoModule = require('./models/banco.js');
const perfilModule = require('./models/perfil.js');
const despachoModule = require('./models/despacho.js');
const roleModule = require('./models/role.js');

//'ctz_triturados', 'ctz_programador', 'mesQa&Y~9BHS'
//'triturados','root',''

const sequelize = new Sequelize('triturados','root','',{
    host:'localhost',
    dialect:'mysql'
});
 
const Role = roleModule(sequelize, Sequelize);
const User = userModule(sequelize, Sequelize);
const Perfil = perfilModule(sequelize, Sequelize);

const Pedido = pedidoModule(sequelize, Sequelize);
//const Cliente = clienteModule(sequelize, Sequelize);
const Concreto = concretoModule(sequelize, Sequelize);
//const Conductor = conductorModule(sequelize, Sequelize);
//const Vendedor = vendedorModule(sequelize, Sequelize);
const Cierre = cierreModule(sequelize, Sequelize);
const Credito = creditoModule(sequelize, Sequelize);
const Pago = pagoModule(sequelize, Sequelize);
const Banco = bancoModule(sequelize, Sequelize);
const Despacho = despachoModule(sequelize, Sequelize);

sequelize.sync({force:false}).then(()=>{
    console.log("Conexión sql exitosa");
});

module.exports = {User, Pedido, Concreto, Cierre, Credito, Pago, Banco, Perfil, Despacho, Role};