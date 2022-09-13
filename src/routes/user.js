const router = require('express').Router();
const { User } = require('../db');

router.get('/user', async (req,res)=>{
    const users = await User.findAll();
    res.json(users);
});

router.post('/user', async (req,res)=>{
    const userCreated = await User.create(req.body);
    res.json(req.body);
});

module.exports=router;