module.exports = (sequelize, type)=>{
    return sequelize.define('banco',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        codigo:type.STRING,
        nombre:type.STRING,
        monto_actual:type.STRING,
        estado:type.STRING
    })
}