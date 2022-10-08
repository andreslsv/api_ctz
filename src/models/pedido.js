module.exports = (sequelize, type)=>{
    return sequelize.define('pedido',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        nombre_cliente:type.STRING,
        fecha_despacho:type.STRING,
        hora_cargue:type.STRING,
        hora_obra:type.STRING,
        ult_actualizacion:type.STRING,
        direccion:type.STRING,
        observaciones:type.STRING,
        descarga:type.STRING,
        tipo_concreto:type.STRING,
        precio_concreto:type.STRING,
        m3:type.STRING,
        precio_pedido:type.STRING,
        nombre_vendedor:type.STRING,
        nombre_conductor:type.STRING,
        estado:type.STRING,
        aprobado:type.INTEGER,//1 No Aprobado 2 aprobado
        fecha_despacho:type.STRING,
        hora_despacho:type.STRING,
        hora_llegada:type.STRING,
        hora_en_cargue:type.STRING,
        hora_fin:type.STRING
    })
}