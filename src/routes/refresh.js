/*const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
const { User } = require('../db');

router.post('/refresh/:token_req', async (req,res,next)=>{

    try{
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
    }catch(error){
        res.send(error);
    }

});

module.exports = router;*/