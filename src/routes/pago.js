const router = require('express').Router();
const { where } = require('sequelize');
const { Op } = require("sequelize");
const { Pago } = require('../db');

router.get('/pago', async (req,res)=>{
    
    var mainStatement = {};
    var whereStatement = {};
    mainStatement.where = whereStatement;

    if(req.query.limit){
        mainStatement.limit = parseInt(req.query.limit);
    }

    if(req.query.offset){
        mainStatement.offset = parseInt(req.query.offset);
    }

    if(req.query.search_nombre){
        whereStatement.nombre = {[Op.like]: '%' + req.query.search_nombre + '%'};
    }

    const pago = await Pago.findAll(mainStatement);

    res.json(pago); 
});

module.exports=router;