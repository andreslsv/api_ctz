const router = require('express').Router();
const { where } = require('sequelize');
const { Op } = require("sequelize");
const { Pedido } = require('../db');

router.get('/pedido', async (req,res)=>{

    var whereStatement = {};

    if(req.query.search_nombre){
        whereStatement.nombre = {[Op.like]: '%' + req.query.search_nombre + '%'};
    }

    const pedido = await Pedido.findAll({
        where:whereStatement,
        limit:parseInt(req.query.limit),
        offset:parseInt(req.query.offset),
    });

    res.json(pedido); 
});

router.post('/pedido', async (req,res)=>{
    const pedidoCreated = await Pedido.create(req.body);
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