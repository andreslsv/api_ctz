const router = require('express').Router();
const { where } = require('sequelize');
const { Op } = require("sequelize");
const { Conductor, User } = require('../db');

router.get('/conductor', async (req,res)=>{

    var mainStatement = {};
    var whereStatement = {};
    mainStatement.where = whereStatement;

    mainStatement.include = [User];

    if(req.query.limit){
        mainStatement.limit = parseInt(req.query.limit);
    }

    if(req.query.offset){
        mainStatement.offset = parseInt(req.query.offset);
    }

    if(req.query.search_nombre){
        whereStatement.nombre = {[Op.like]: '%' + req.query.search_nombre + '%'};
    }

    if(req.query.search_placa){
        whereStatement.placa = {[Op.like]: '%' + req.query.search_placa + '%'};
    }

    if(req.query.search_correo){
        whereStatement.email = {[Op.like]: '%' + req.query.search_correo + '%'};
    }

    const conductor = await Conductor.findAndCountAll(mainStatement);

    res.json(conductor); 
});

router.post('/conductor', async (req,res)=>{
    const conductorCreated = await Conductor.create(req.body);
    res.json(conductorCreated);
});

router.delete('/conductor/:id', async (req,res)=>{
    const conductorDeleted = await Conductor.destroy({
        where: {
            id:req.params.id
        }
    });
    res.json(conductorDeleted);
});

module.exports=router;