const router = require('express').Router();
const { where } = require('sequelize');
const { Op } = require("sequelize");
const { Perfil, Pedido, Pago, Cliente, User } = require('../db');

router.get('/perfil', async (req,res)=>{

    var mainStatement = {};
    var whereStatement = {};
    mainStatement.where = whereStatement;

    const include = [User];
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

    if(req.query.role){
        whereStatement.role = req.query.role;
    }

    if(req.query.search_nombre){
        whereStatement.nombre = {[Op.like]: '%' + req.query.search_nombre + '%'};
    }

    if(req.query.id){
        whereStatement.id = req.query.id;
    }

    const perfil = await Perfil.findAndCountAll(mainStatement);

    res.json(perfil); 
});

router.get('/perfil/:id', async (req,res)=>{

    const perfil = await Perfil.findAndCountAll({
        where:{
            id:req.params.id
        }
    });

    res.json(perfil.slice(0, 1).shift()); 
});

module.exports=router;