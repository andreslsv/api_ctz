const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
const { User } = require('../db');

router.post('/login', async (req,res)=>{

    const user = await User.findAll({
        where:req.body
    });

    if(user.length == 0){
        res.json({
            error:`Credenciales incorrectas`
        });
        }else{
            const token = jwt.sign({check:  true}, req.app.get('llave'), {
                expiresIn: 1440
            });

            res.json({
                mensaje: 'Bienvenido',
                token: token,
                user:user
               });
        }

});

module.exports = router;