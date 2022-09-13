module.exports = (sequelize, type)=>{
    return sequelize.define('conductore',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        nombre:type.STRING,
        telefono:type.STRING,
        documento:type.STRING,
        email:type.STRING,
        placa:type.STRING,
        fecha_registro:type.STRING
    })
}