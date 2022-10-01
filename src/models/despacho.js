module.exports = (sequelize, type)=>{
    return sequelize.define('despacho',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        fecha_despacho:type.STRING,
        hora_despacho:type.STRING,
        hora_llegada:type.STRING,
        hora_cargue:type.STRING,
        hora_fin:type.STRING
    })
}