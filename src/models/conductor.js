module.exports = (sequelize, type)=>{
    return sequelize.define('conductore',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        placa:type.STRING,//Diferencial
        nombre:type.STRING,
        tipo_documento:type.STRING,
        documento:type.STRING,
        fecha:type.STRING,
        direccion:type.STRING,
        telefono:type.STRING,
    })
}