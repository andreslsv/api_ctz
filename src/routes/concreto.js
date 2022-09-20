const router = require('express').Router();
const { where } = require('sequelize');
const { Op } = require("sequelize");
const { Concreto } = require('../db');

router.get('/concreto', async (req,res)=>{

    var whereStatement = {};

    if(req.query.search_nombre){
        whereStatement.nombre = {[Op.like]: '%' + req.query.search_nombre + '%'};
    }

    const concreto = await Concreto.findAll({
        where:whereStatement,
        limit:parseInt(req.query.limit),
        offset:parseInt(req.query.offset),
    });

    res.json(concreto); 
});

router.post('/concreto', async (req,res)=>{
    const concretoCreated = await Concreto.create(req.body);
    res.json(concretoCreated);
});

router.delete('/concreto/:id', async (req,res)=>{
    const concretoDeleted = await Concreto.destroy({
        where: {
            id:req.params.id
        }
    });
    res.json(concretoDeleted);
});

module.exports=router;