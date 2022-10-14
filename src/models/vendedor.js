module.exports = (sequelize, type)=>{
    return sequelize.define('vendedore',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        nombre:type.STRING,
        apellido:type.STRING,
        tipo_documento:type.STRING,
        documento:type.STRING,
        fecha:type.STRING,
        direccion:type.STRING,
        telefono:type.STRING,
        color:type.STRING
    })
}