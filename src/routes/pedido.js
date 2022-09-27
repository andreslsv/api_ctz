const router = require('express').Router();
const { where } = require('sequelize');
const { Op } = require("sequelize");
const { Pedido, Credito, Concreto, Vendedor, Conductor, Cliente } = require('../db');
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

    if(req.query.search_nombre){
        whereStatement.fecha_despacho = {[Op.between]: [req.query.fechaInicio, req.query.fechaFin]};
    }
    
    const pedido = await Pedido.findAll(mainStatement);

    res.json(pedido); 
});

router.post('/pedido', async (req,res)=>{
    const pedidoCreated = await Pedido.create(req.body);

    const credito = {
        "pedidoId":pedidoCreated.id,
        "valor":req.body.valor,
        "abonos":0,
        "ultimo_pago":"",
        "fecha_pago":req.body.fecha_pago,
        "estado":"",
    }

    const creditoCreated = await Credito.create(credito);
    res.json(pedidoCreated);
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