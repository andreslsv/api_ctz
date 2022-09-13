const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
const { User } = require('../db');

router.post('/login', async (req,res)=>{

    const users = await User.findAll({
        where:req.body
    });

    if(users.length == 0){
        res.json({
            error:`Credenciales incorrectas`
        });
        }else{
            const token = jwt.sign({check:  true}, req.app.get('llave'), {
                expiresIn: 1440
            });

            res.json({
                error: 'No autorizado',
                token: token
               });
        }

});

module.exports = router;