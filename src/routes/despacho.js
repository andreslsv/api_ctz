const router = require('express').Router();
const { where } = require('sequelize');
const { Op } = require("sequelize");
const { Despacho, Pedido } = require('../db');

router.get('/despacho', async (req,res)=>{
    var mainStatement = {};
    var whereStatement = {};

    const include = [Pedido];
    mainStatement.include = include;
    
    mainStatement.where = whereStatement;

    if(req.query.limit){
        mainStatement.limit = parseInt(req.query.limit);
    }

    if(req.query.offset){
        mainStatement.offset = parseInt(req.query.offset);
    }

    const despacho = await Despacho.findAndCountAll(mainStatement);

    res.json(despacho);
});

router.post('/despacho', async (req,res)=>{
    const despachoCreated = await Despacho.create(req.body);
    res.json(despachoCreated);
});

router.delete('/despacho/:id', async (req,res)=>{
    const despachoDeleted = await Despacho.destroy({
        where: {
            id:req.params.id
        }
    });
    res.json(despachoDeleted);
});

module.exports=router;