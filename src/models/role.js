module.exports = (sequelize, type)=>{
    return sequelize.define('role',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        nombre:type.STRING,
        descripcion:type.STRING
    },
    {
        tableName: 'roles'
    })
}