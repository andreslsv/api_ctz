const router = require('express').Router();
const { where } = require('sequelize');
const { Op } = require("sequelize");
const { Vendedor } = require('../db');

router.get('/vendedor', async (req,res)=>{

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

    if(req.query.search_telefono){
        whereStatement.telefono = {[Op.like]: '%' + req.query.search_telefono + '%'};
    }

    const vendedor = await Vendedor.findAll(mainStatement);

    res.json(vendedor); 
});

router.post('/vendedor', async (req,res)=>{
    const vendedorCreated = await Vendedor.create(req.body);
    res.json(vendedorCreated);
});

router.delete('/vendedor/:id', async (req,res)=>{
    const vendedorDeleted = await Vendedor.destroy({
        where: {
            id:req.params.id
        }
    });
    res.json(vendedorDeleted);
});

module.exports=router;