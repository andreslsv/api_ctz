module.exports = (sequelize, type)=>{
    return sequelize.define('vendedore',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        nombre:type.STRING,
        telefono:type.STRING,
        documento:type.STRING,
    })
}