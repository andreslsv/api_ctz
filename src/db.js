const Sequelize = require('sequelize');

const userModule = require('./models/user.js');

const sequelize = new Sequelize('triturados', 'root', '',{
    host:'localhost',
    dialect:'mysql'
});

const User = userModule(sequelize, Sequelize);

sequelize.sync({force:false}).then(()=>{
    console.log("Conexión sql exitosa");
});

module.exports = {User};