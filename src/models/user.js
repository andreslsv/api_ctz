module.exports = (sequelize, type)=>{
    return sequelize.define('user',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        name:type.STRING,
        nick:type.STRING,
        role:type.STRING,
        email:type.STRING,
        avatar:type.STRING,
        status:type.STRING,
        password:type.STRING
    })
}