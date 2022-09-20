module.exports = (sequelize, type)=>{
    return sequelize.define('perfil',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        nombre:type.STRING,
        tipo_documento:type.INTEGER,
        documento:type.STRING,
        direccion:type.STRING,
        telefono:type.STRING,
        email:type.STRING,
        placa:type.STRING,
        fecha_registro:type.STRING,
        fecha:type.STRING,
        estado:type.INTEGER
    })
}