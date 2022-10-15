const router = require('express').Router();
const { where } = require('sequelize');
const { Op } = require("sequelize");
const { Concreto, Pedido, Credito, Perfil } = require('../db');

router.get('/extras-despachos', async (req,res)=>{
    
    const pedidos_despachados = await Pedido.findAll(
        {
            where:{estado:"despachado",
            fecha_despacho:{[Op.between]: [req.query.fechaInicio, req.query.fechaFin]}
        }
    });
    const pedidos_no_despachados = await Pedido.findAll(
        {
            where:{
                estado:!"despachado",
                fecha_despacho:{[Op.between]: [req.query.fechaInicio, req.query.fechaFin]}
            }
        });

    res.json([{
        "name":"No aprobados",
        "value":pedidos_despachados.length
    },
    {
        "name":"Aprobados",
        "value":pedidos_no_despachados.length
    }]); 
});


router.get('/extras-pagados', async (req,res)=>{
    const pagados = await Credito.findAll(
        {
            where:{
                estado:"pagado",
            },
            include :[{
                model:Pedido,
                as: 'pedido',
                where:{
                    fecha_despacho:{[Op.between]: [req.query.fechaInicio, req.query.fechaFin]}
                }
            }]
        });
    const noPagados = await Credito.findAll({
        where:{
            estado:"no pagado"
        },
        include :[{
            model:Pedido,
            as: 'pedido',
            where:{
                fecha_despacho:{[Op.between]: [req.query.fechaInicio, req.query.fechaFin]}
            }
        }]
    });
    const enMora = await Credito.findAll({
        where:{
            estado:"en mora"
        },
        include :[{
            model:Pedido,
            as: 'pedido',
            where:{
                fecha_despacho:{[Op.between]: [req.query.fechaInicio, req.query.fechaFin]}
            }
        }]
    });

    res.json([
    {
        "name":"En mora",
        "value":enMora.length
    },
    {
        "name":"Pagados",
        "value":pagados.length
    },
    {
        "name":"No pagados",
        "value":noPagados.length
    }
    ]); 
});


router.get('/extras-conductores', async (req,res)=>{
    const pedidoConductores = await Pedido.findAll({
        include:[{model:Perfil,as:"conductor2"}],
        where:{
            fecha_despacho:{[Op.between]: [req.query.fechaInicio, req.query.fechaFin]}
        }
    });
    let dataConductores = [];
    let _conductores_detectados = [];

    //Mapear los datos del pedido
    pedidoConductores.map((data_pedido)=>{
        let conductor_existe = false;

        _conductores_detectados.map((data_conductor)=>{

            if(data_pedido.conductor2.nombre == data_conductor.name){
                data_conductor.value = parseInt(data_conductor.value) + parseInt(data_pedido.m3);
                conductor_existe = true;
            }
        });

        if(conductor_existe == false){
            _conductores_detectados.push({
                "name":data_pedido.conductor2.nombre,
                "value":parseInt(data_pedido.m3)
            });
        }
    });

    //_conductores_detectados.push(pedidoConductores);
    res.json(_conductores_detectados);

});

router.get('/extras-descargas', async (req,res)=>{
    const pedidoDescarga = await Pedido.findAll({
        where:{
            fecha_despacho:{[Op.between]: [req.query.fechaInicio, req.query.fechaFin]}
        }
    });
    let dataConductores = [];
    let _descargas_detectados = [];

    //Mapear los datos del pedido
    pedidoDescarga.map((data_pedido)=>{
        let descarga_existe = false;

        _descargas_detectados.map((data_descarga)=>{

            if(data_pedido.descarga  == data_descarga.name){
                data_descarga.value = parseInt(data_descarga.value) + parseInt(data_pedido.m3);
                descarga_existe = true;
            }
        });

        if(descarga_existe == false){
            _descargas_detectados.push({
                "name":data_pedido.descarga,
                "value":parseInt(data_pedido.m3)
            });
        }
    });

    //_conductores_detectados.push(pedidoConductores);
    res.json(_descargas_detectados);

});


router.get('/extras-contadores', async (req,res)=>{
    const pedidos = await Pedido.findAll({
        where:{
            aprobado:req.query.aprobado,
            fecha_despacho:{[Op.between]: [req.query.fechaInicio, req.query.fechaFin]}
        }
    });

    var total=pedidos.length;
    var m3Pedidos=0;
    var porDespachar=0;
    var despachados=0;

    pedidos.map((data)=>{
        m3Pedidos = parseInt(m3Pedidos) + parseInt(data.m3);
        if(data.estado=='programado') {
            porDespachar++;
        }
        if(data.estado=='despachado'){
            despachados++
        }
    });

    var valores={total:total,m3Pedidos:m3Pedidos,porDespachar:porDespachar,despachados:despachados}

    res.json(valores);
});

module.exports=router;