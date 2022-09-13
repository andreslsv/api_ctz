module.exports = (sequelize, type)=>{
    return sequelize.define('pago',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        num_recibo:type.STRING,
        recibido_por:type.STRING,
        fecha:type.STRING,
        valor:type.STRING,
        nombre_banco:type.STRING,
        observaciones:type.STRING
    })
}