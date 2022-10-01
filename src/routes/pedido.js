const router = require('express').Router();
const { where } = require('sequelize');
const { Op } = require("sequelize");
const { Pedido, Credito, Concreto, Vendedor, Conductor, Cliente, Cierre, Despacho } = require('../db');
const moment = require('moment');

router.get('/pedido', async (req,res)=>{

    var mainStatement = {};
    var whereStatement = {};
    mainStatement.where = whereStatement;

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

    if(req.query.search_nombre_cliente){
        whereStatement.cliente = {[Op.like]: '%' + req.query.search_nombre_cliente + '%'};
    }

    if(req.query.aprobado){
        whereStatement.aprobado = req.query.aprobado;
    }
    
    const pedido = await Pedido.findAndCountAll(mainStatement);

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

    console.log("Esta es la fecha completa");

    if (cierre_vigente.length>0){
        res.status(500).send({ error: 'Dia y hora bloqueados' })
    }

    const pedidoCreated = await Pedido.create(req.body);

    const credito = {
        "pedidoId":pedidoCreated.id,
        "valor":req.body.valor,
        "abonos":0,
        "ultimo_pago":"",
        "fecha_pago":req.body.fecha_pago,
        "estado":"",
    }

    const despacho = {
        "pedidoId":pedidoCreated.id
    }

    const despachoCreated = await Despacho.create(despacho);
    const creditoCreated = await Credito.create(credito);
    res.json(pedidoCreated);
});


router.post('/pedido/:id', async (req,res)=>{
    const pedidoActualizado = await Pedido.update(
        req.body,
        {
          where: {
            id:req.params.id
            },
        }
      );
    res.json(pedidoActualizado);
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