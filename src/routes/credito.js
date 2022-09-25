const router = require('express').Router();
const { where } = require('sequelize');
const { Op } = require("sequelize");
const { Credito } = require('../db');

router.get('/credito', async (req,res)=>{

    var whereStatement = {};

    if(req.query.search_nombre){
        whereStatement.nombre = {[Op.like]: '%' + req.query.search_nombre + '%'};
    }

    const credito = await Credito.findAll({
        where:whereStatement,
        limit:parseInt(req.query.limit),
        offset:parseInt(req.query.offset),
    });

    res.json(credito); 
});

router.post('/credito', async (req,res)=>{
    const creditoCreated = await Credito.create(req.body);
    res.json(creditoCreated);
});

router.delete('/credito/:id', async (req,res)=>{
    const creditoDeleted = await Credito.destroy({
        where: {
            id:req.params.id
        }
    });
    res.json(creditoDeleted);
});

module.exports=router;