const router = require('express').Router();
const { where } = require('sequelize');
const { Op } = require("sequelize");
const { Concreto, Pedido, Credito } = require('../db');

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

    res.json([{
        "name":"Pagados",
        "value":pagados.length
    },
    {
        "name":"No pagados",
        "value":noPagados.length
    },
    {
        "name":"En mora",
        "value":enMora.length
    }]); 
});


router.get('/extras-conductores', async (req,res)=>{
    const pedidoConductores = await Pedido.findAll({
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

            if(data_pedido.nombre_conductor == data_conductor.name){
                data_conductor.value = parseInt(data_conductor.value) + parseInt(data_pedido.m3);
                conductor_existe = true;
            }
        });

        if(conductor_existe == false){
            _conductores_detectados.push({
                "name":data_pedido.nombre_conductor,
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

module.exports=router;