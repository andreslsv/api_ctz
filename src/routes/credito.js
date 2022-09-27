const router = require('express').Router();
const { where } = require('sequelize');
const { Op } = require("sequelize");
const { Credito, Pedido } = require('../db');

router.get('/credito', async (req,res)=>{

    var mainStatement = {};
    var whereStatement = {};
    mainStatement.where = whereStatement;

    const include = [Pedido];
    mainStatement.include = include;


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
        whereStatement.nombre = {[Op.like]: '%' + req.query.search_nombre + '%'};
    }

    const credito = await Credito.findAll(mainStatement);

    res.json(credito); 
});

module.exports=router;