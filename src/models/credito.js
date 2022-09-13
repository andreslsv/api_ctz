module.exports = (sequelize, type)=>{
    return sequelize.define('credito',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        fecha:type.STRING,
        valor:type.STRING,
        abonos:type.STRING,
        ultimo_pago:type.STRING,
        fecha_pago:type.STRING,
        estado:type.INTEGER
    })
}