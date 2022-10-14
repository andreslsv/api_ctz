module.exports = (sequelize, type)=>{
    return sequelize.define('perfil',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        nombre:type.STRING,
        apellido:type.STRING,
        tipo_documento:type.STRING,
        documento:type.STRING,
        direccion:type.STRING,
        telefono:type.STRING,
        email:type.STRING,
        placa:type.STRING,
        fecha:type.STRING,
        estado:type.STRING,
        color:type.STRING
    })
}