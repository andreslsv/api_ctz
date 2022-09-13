module.exports = (sequelize, type)=>{
    return sequelize.define('cliente',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        user_id:type.INTEGER,
        nombre:type.STRING,
        tipo_documento:type.INTEGER,
        direccion:type.STRING,
        telefono_contacto:type.STRING
    })
}