const router = require('express').Router();
const { where } = require('sequelize');
const { Op } = require("sequelize");
const { Credito, Pedido, Pago, Perfil } = require('../db');

router.get('/credito', async (req,res)=>{

    var mainStatement = {};
    var whereStatement = {};
    mainStatement.where = whereStatement;

    includePedido = {
        model:Pedido,
        include:[{model:Perfil,as:"cliente2"}],
    };

    includePedidoWhere = {};

    if(req.query.limit){
        mainStatement.limit = parseInt(req.query.limit);
    }

    if(req.query.offset){
        mainStatement.offset = parseInt(req.query.offset);
    }

    if(req.query.order){
        mainStatement.order = [['id', 'DESC']];
    }

    if(req.query.aprobado){
        includePedidoWhere.aprobado = req.query.aprobado;
    }

    if(req.query.fechaInicio && req.query.fechaFin){
        includePedidoWhere.fecha_despacho = {[Op.between]: [req.query.fechaInicio, req.query.fechaFin]};
    }

    if(req.query.search_nombre){
        whereStatement.nombre = {[Op.like]: '%' + req.query.search_nombre + '%'};
    }

    if(req.query.id){
        whereStatement.id = req.query.id;
    }

    includePedido.where = includePedidoWhere;

    const include = [includePedido, Pago];

    mainStatement.include = include;

    const credito = await Credito.findAndCountAll(mainStatement);

    res.json(credito); 
});

router.get('/credito/:id', async (req,res)=>{

    const credito = await Credito.findAll({
        where:{
            id:req.params.id
        }
    });

    res.json(credito.slice(0, 1).shift()); 
});

module.exports=router;