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

User.hasMany(Cierre);
Cierre.belongsTo(User);

Credito.hasMany(Pago, { onDelete: 'cascade' });
Pago.belongsTo(Credito, { onDelete: 'cascade' });

Banco.hasMany(Pago);
Pago.belongsTo(Banco);

