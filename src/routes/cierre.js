const router = require('express').Router();
const { where } = require('sequelize');
const { Op } = require("sequelize");
const { Cierre } = require('../db');

router.get('/cierre', async (req,res)=>{
    var mainStatement = {};
    var whereStatement = {};
    
    mainStatement.where = whereStatement;

    if(req.query.limit){
        mainStatement.limit = parseInt(req.query.limit);
    }

    if(req.query.offset){
        mainStatement.offset = parseInt(req.query.offset);
    }

    const cierre = await Cierre.findAll(mainStatement);

    res.json(cierre);
});

router.post('/cierre', async (req,res)=>{
    const cierreCreated = await Cierre.create(req.body);
    res.json(cierreCreated);
});

router.delete('/cierre/:id', async (req,res)=>{
    const cierreDeleted = await Cierre.destroy({
        where: {
            id:req.params.id
        }
    });
    res.json(cierreDeleted);
});

module.exports=router;