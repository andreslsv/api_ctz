const {User, Concreto, Pedido, Credito, Cierre, Pago, Banco, Perfil, Despacho} = require('./db');

/*
Relaciones uno a uno
*/
/*
User.hasOne(Perfil);
Perfil.belongsTo(User);
*/

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


//Duplicados

Perfil.hasMany(Pedido, { onDelete: 'cascade' });
Pedido.belongsTo(Perfil,{as:"cliente2",onDelete: 'cascade'});

Perfil.hasMany(Pedido, { onDelete: 'cascade' });
Pedido.belongsTo(Perfil,{as:"vendedor2",onDelete: 'cascade'});

Perfil.hasMany(Pedido, { onDelete: 'cascade' });
Pedido.belongsTo(Perfil,{as:"conductor2",onDelete: 'cascade'});

//Duplicados

User.hasMany(Cierre);
Cierre.belongsTo(User);

Credito.hasMany(Pago, { onDelete: 'cascade' });
Pago.belongsTo(Credito, { onDelete: 'cascade' });

Banco.hasMany(Pago);
Pago.belongsTo(Banco);

