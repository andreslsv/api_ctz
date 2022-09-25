const router = require('express').Router();
const { where } = require('sequelize');
const { Op } = require("sequelize");
const { Cliente } = require('../db');

router.get('/cliente', async (req,res)=>{
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
        whereStatement.telefono_contacto = {[Op.like]: '%' + req.query.search_telefono + '%'};
    }

    const cliente = await Cliente.findAll(mainStatement);

    res.json(cliente);
});

router.post('/cliente', async (req,res)=>{
    const clienteCreated = await Cliente.create(req.body);
    res.json(clienteCreated);
});

router.delete('/cliente/:id', async (req,res)=>{
    const clienteDeleted = await Cliente.destroy({
        where: {
            id:req.params.id
        }
    });
    res.json(clienteDeleted);
});

module.exports=router;