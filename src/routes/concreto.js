const router = require('express').Router();
const { where } = require('sequelize');
const { Op } = require("sequelize");
const { Concreto } = require('../db');

router.get('/concreto', async (req,res)=>{
    
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

    const concreto = await Concreto.findAndCountAll(mainStatement);

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