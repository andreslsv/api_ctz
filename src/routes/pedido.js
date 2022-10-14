const router = require('express').Router();
const { where } = require('sequelize');
const { Op } = require("sequelize");
const { Pedido, Credito, Concreto, Vendedor, Conductor, Cliente, Cierre, Despacho, User, Perfil } = require('../db');
const moment = require('moment');

router.get('/pedido', async (req,res)=>{

    var mainStatement = {};
    var whereStatement = {};
    mainStatement.where = whereStatement;

    var modelCliente = {
        model:Cliente
    }

    if(req.query.limit){
        mainStatement.limit = parseInt(req.query.limit);
    }

    if(req.query.offset){
        mainStatement.offset = parseInt(req.query.offset);
    }

    if(req.query.order){
        mainStatement.order = [['id', 'DESC']];
    }

    if(req.query.fechaInicio && req.query.fechaFin){
        whereStatement.fecha_despacho = {[Op.between]: [req.query.fechaInicio, req.query.fechaFin]};
    }

    /*if(req.query.search_nombre_cliente){
        whereStatement.nombre_cliente = {[Op.like]: '%' + req.query.search_nombre_cliente + '%'};
    }*/

    if(req.query.search_nombre_cliente){
        modelCliente.where = {[Op.or]:[
            {nombre:{[Op.like]: '%' + req.query.search_nombre_cliente + '%'}},
            {apellido:{[Op.like]: '%' + req.query.search_nombre_cliente + '%'}}
        ]};
    }

    if(req.query.aprobado){
        whereStatement.aprobado = req.query.aprobado;
    }

    mainStatement.include=[modelCliente,{model:Concreto},{model:Conductor},{model:Vendedor},{model:Perfil,as:'cliente2'}];
    
    const pedido = await Pedido.findAndCountAll(mainStatement);

    res.json(pedido); 
});


router.get(`/pedido/:id`, async (req,res)=>{

    const pedido = await Pedido.findOne({
        include:[{model:Cliente},Vendedor,Conductor,Concreto,Credito],
        where:{
            id:req.params.id
        }
    });

    res.json(pedido); 
});

router.post('/pedido', async (req,res)=>{

    const fecha_despacho = moment(req.body.fecha_despacho,'YYYY-MM-DD').format('DD-MM-YYYY');
    const hora_inicio = moment(req.body.hora_cargue,"HH:mm").format("HH:mm");

    const fecha_completa = `${fecha_despacho}${hora_inicio}`

    const cierre_vigente = await Cierre.findAll({
        where:{
            [Op.and]: [
                {fecha:{
                    [Op.eq]:req.body.fecha_despacho
                    }},
                {
                    hora_inicio:{
                        [Op.lte]:hora_inicio
                    }
                },
                {
                    hora_fin:{
                        [Op.gte]:hora_inicio
                    }
                },
            ]
        }
    });


    if (cierre_vigente.length>0){
        res.status(500).send({ error: 'Dia y hora bloqueados' });
    }else{
        const pedidoCreated = await Pedido.create(req.body);

        const credito = {
            "pedidoId":pedidoCreated.id,
            "valor":req.body.valor,
            "abonos":0,
            "ultimo_pago":"",
            "fecha_pago":req.body.fecha_pago,
            "estado":"no pagado",
        }
    
        const despacho = {
            "pedidoId":pedidoCreated.id
        }
    
        const despachoCreated = await Despacho.create(despacho);
        const creditoCreated = await Credito.create(credito);
        res.json(pedidoCreated);
    }
});


router.post('/pedido/:id', async (req,res)=>{

    const fecha_despacho = moment(req.body.fecha_despacho,'YYYY-MM-DD').format('DD-MM-YYYY');
    const hora_inicio = moment(req.body.hora_cargue,"HH:mm").format("HH:mm");

    const cierre_vigente = await Cierre.findAll({
        where:{
            [Op.and]: [
                {fecha:{
                    [Op.eq]:req.body.fecha_despacho
                    }},
                {
                    hora_inicio:{
                        [Op.lte]:hora_inicio
                    }
                },
                {
                    hora_fin:{
                        [Op.gte]:hora_inicio
                    }
                },
            ]
        }
    });

    if (cierre_vigente.length>0){
        res.status(500).send({ error: 'Dia y hora bloqueados' });
    }else{
        const pedidoActualizado = await Pedido.update(
            req.body,
            {
              where: {
                id:req.params.id
                }
            }
          );

        const credito = {
            "valor":req.body.valor,
            "abonos":0,
            "ultimo_pago":"",
            "fecha_pago":req.body.fecha_pago,
            "estado":"no pagado",
        }

        const creditoUpdated = await Credito.update(
            credito,
            {
              where: {
                pedidoId:req.params.id
                }
            }
          );
    
        //const creditoCreated = await Credito.create(credito);
        res.json(pedidoActualizado);
    }

    //res.json(pedidoActualizado);
});

router.delete('/pedido/:id', async (req,res)=>{
    const pedidoDeleted = await Pedido.destroy({
        where: {
            id:req.params.id
        }
    });
    res.json(pedidoDeleted);
});

module.exports=router;