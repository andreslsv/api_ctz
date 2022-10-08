const {User, Concreto, Pedido, Conductor, Vendedor, Cliente, Credito, Cierre, Pago, Banco, Perfil, Despacho} = require('./db');

/*
Relaciones uno a uno
*/
User.hasOne(Perfil);
Perfil.belongsTo(User);

User.hasOne(Conductor);
Conductor.belongsTo(User);

User.hasOne(Vendedor);
Vendedor.belongsTo(User);

User.hasOne(Cliente);
Cliente.belongsTo(User);

Pedido.hasOne(Credito);
Credito.belongsTo(Pedido);

Pedido.hasOne(Despacho);
Despacho.belongsTo(Pedido);

/*
Relaciones uno a muchos
*/

Concreto.hasMany(Pedido);
Pedido.belongsTo(Concreto);

Vendedor.hasMany(Pedido);
Pedido.belongsTo(Vendedor);

Conductor.hasMany(Pedido);
Pedido.belongsTo(Conductor);

Cliente.hasMany(Pedido);
Pedido.belongsTo(Cliente);

User.hasMany(Cierre);
Cierre.belongsTo(User);

Credito.hasMany(Pago);
Pago.belongsTo(Credito);

Banco.hasMany(Pago);
Pago.belongsTo(Banco);

