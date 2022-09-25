const router = require('express').Router();
const { User, Perfil, Cliente, Conductor, Vendedor } = require('../db');
const { Op } = require("sequelize");

router.get('/user', async (req,res)=>{
    var whereStatement = {};

    if(req.query.search_nombre){
        whereStatement.name = {[Op.like]: '%' + req.query.search_nombre + '%'};
    }
    if(req.query.search_correo){
        whereStatement.email = {[Op.like]: '%' + req.query.search_correo + '%'};
    }
    if(req.query.role && req.query.role!="todo"){
        whereStatement.role = req.query.role;
    }

    const user = await User.findAll({
        where:whereStatement,
        limit:parseInt(req.query.limit),
        offset:parseInt(req.query.offset),
    });

    res.json(user);
});

router.post('/user', async (req,res)=>{

    const usuario = {
        "name":`${req.body.nombres} ${req.body.apellidos}`,
        "nick":req.body.nickname,
        "role":req.body.role,
        "email":req.body.email,
        "password":req.body.password_1,
        "avatar":"---",
        "status":2,
    };

    const userCreated = await User.create(usuario);

    if(req.body.role=="vendedor"){
        const vendedor = {
            "nombre":`${req.body.nombres} ${req.body.apellidos}`,
            "telefono":req.body.telefono,
            "documento":req.body.documento,
            "userId":userCreated.id
        }
        const vendedorCreated = await Vendedor.create(vendedor);
    }

    if(req.body.role=="conductor"){
        const conductor = {
            "nombre":`${req.body.nombres} ${req.body.apellidos}`,
            "telefono":req.body.telefono,
            "documento":req.body.documento,
            "email":req.body.email,
            "placa":req.body.placa,
            "fecha_registro":req.body.fecha_registro,
            "userId":userCreated.id
        }
        const conductorCreated = await Conductor.create(conductor);
    }

    if(req.body.role=="cliente"){
        const cliente = {
            "nombre":`${req.body.nombres} ${req.body.apellidos}`,
            "telefono":req.body.telefono,
            "documento":req.body.documento,
            "email":req.body.email,
            "placa":req.body.placa,
            "fecha":req.body.fecha,
            "userId":userCreated.id
        }
        const clienteCreated = await Cliente.create(cliente);
    }

    /*
    const perfil = {
        "userId": userCreated.id,
        "nombre":`${req.body.nombres} ${req.body.apellidos}`,
        "tipo_documento":req.body.tipo_documento,
        "documento":req.body.documento,
        "direccion":req.body.direccion,
        "telefono":"---",
        "email":2,
        "placa":req.body.placa,
        "fecha_registro":req.body.fecha_registro,
        "fecha":req.body.fecha,
        "estado":"---"
    };

    const perfilCreated = await Perfil.create(perfil);
    */

    res.json(userCreated);
});

router.delete('/user/:id', async (req,res)=>{
    const userDeleted = await User.destroy({
        where: {
            id:req.params.id
        }
    });
    res.json(userDeleted);
});

router.get('/user/:id', async (req,res)=>{
    const user = await User.findAll({
        where: {
            id:req.params.id
        }
    });
    res.json(user);
});


module.exports=router;