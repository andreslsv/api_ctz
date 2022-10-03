const router = require('express').Router();
const { where } = require('sequelize');
const { Op } = require("sequelize");
const { Pago, Credito } = require('../db');

router.get('/pago', async (req,res)=>{
    
    var mainStatement = {};
    var whereStatement = {};
    mainStatement.where = whereStatement;

    const include = [Credito];
    mainStatement.include = include;

    if(req.query.limit){
        mainStatement.limit = parseInt(req.query.limit);
    }

    if(req.query.offset){
        mainStatement.offset = parseInt(req.query.offset);
    }

    if(req.query.search_nombre){
        whereStatement.nombre = {[Op.like]: '%' + req.query.search_nombre + '%'};
    }

    if(req.query.creditoId){
        whereStatement.creditoId = req.query.creditoId;
    }

    const pago = await Pago.findAll(mainStatement);

    res.json(pago); 
});

router.post('/pago', async (req,res)=>{
    

    const credito = await Credito.update(
        {
            abonos:parseInt(req.body.creditoAbonos)+parseInt(req.body.valor),
            ultimo_pago:req.body.fecha
        },
        {
          where: {
            id:req.body.creditoId
            }
        }
    );

    const pagoCreated = await Pago.create(req.body);
    res.json(pagoCreated);
});

module.exports=router;