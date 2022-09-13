module.exports = (sequelize, type)=>{
    return sequelize.define('cierre',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        fecha:type.STRING,
        hora_inicio:type.STRING,
        hora_fin:type.STRING,
        usuario:type.STRING
    })
}