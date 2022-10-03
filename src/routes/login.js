const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
const { User } = require('../db');

router.post('/login', async (req,res,next)=>{

    try{
        const user = await User.findAll({
        attributes : ['id', 'nick', 'avatar', 'email', 'status'],
        where:req.body,
        });
    
        if(user.length == 0){
            return res.status(403).send({
                message: 'Credenciales incorrectas'
            });
        }else{
            const token = jwt.sign({check:  true}, req.app.get('llave'), {
                expiresIn: '30d'
            });
    
            res.json({
                mensaje: 'Bienvenido',
                token: token,
                user:user.splice(0, 1).shift()
                });
        }
    }catch(error){
        res.send(error);
    }

});

router.get('/authuser', async (req,res)=>{
    //const userCreated = await User.create(req.body);
    var user =
    {"user":{
        "name":"Andrés Salas",
        "nick":"andres",
        "email":"andres@gmail.com",
        "avatar":"dsfdsf",
        "status":"dsfdsf",
        "password":"1234567"
    }};
    res.json(user);
});



module.exports = router;