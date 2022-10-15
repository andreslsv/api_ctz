const {User, Concreto, Pedido, Conductor, Vendedor, Cliente, Credito, Cierre, Pago, Banco, Perfil, Despacho} = require('./db');

/*
Relaciones uno a uno
*/
User.hasOne(Perfil);
Perfil.belongsTo(User);



User.hasOne(Conductor, { onDelete: 'cascade' });
Conductor.belongsTo(User, { onDelete: 'cascade' });

User.hasOne(Vendedor, { onDelete: 'cascade' });
Vendedor.belongsTo(User, { onDelete: 'cascade' });

User.hasOne(Cliente, { onDelete: 'cascade' });
Cliente.belongsTo(User, { onDelete: 'cascade' });

//Duplicados

User.hasOne(Perfil, { onDelete: 'cascade' });
Perfil.belongsTo(User, { onDelete: 'cascade' });

/*
User.hasOne(Perfil, { onDelete: 'cascade' });
Perfil.belongsTo(User, { onDelete: 'cascade' });

User.hasOne(Perfil, { onDelete: 'cascade' });
Perfil.belongsTo(User, { onDelete: 'cascade' });
*/

//Duplicados





Pedido.hasOne(Credito, { onDelete: 'cascade' });
Credito.belongsTo(Pedido, { onDelete: 'cascade' });

Pedido.hasOne(Despacho);
Despacho.belongsTo(Pedido);

/*
Relaciones uno a muchos
*/

Concreto.hasMany(Pedido, { onDelete: 'cascade' });
Pedido.belongsTo(Concreto);

Vendedor.hasMany(Pedido, { onDelete: 'cascade' });
Pedido.belongsTo(Vendedor);

Conductor.hasMany(Pedido, { onDelete: 'cascade' });
Pedido.belongsTo(Conductor);

Cliente.hasMany(Pedido, { onDelete: 'cascade' });
Pedido.belongsTo(Cliente);

//Duplicados

Perfil.hasMany(Pedido, { onDelete: 'cascade' });
Pedido.belongsTo(Perfil,{as:"cliente2"});

Perfil.hasMany(Pedido, { onDelete: 'cascade' });
Pedido.belongsTo(Perfil,{as:"vendedor2"});

Perfil.hasMany(Pedido, { onDelete: 'cascade' });
Pedido.belongsTo(Perfil,{as:"conductor2"});

//Duplicados

User.hasMany(Cierre);
Cierre.belongsTo(User);

Credito.hasMany(Pago, { onDelete: 'cascade' });
Pago.belongsTo(Credito, { onDelete: 'cascade' });

Banco.hasMany(Pago);
Pago.belongsTo(Banco);

