module.exports = (sequelize, type)=>{
    return sequelize.define('concreto',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        nombre:type.STRING,
        unidad_medida:type.STRING,
        precio:type.STRING
    })
}