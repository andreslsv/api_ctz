const router = require('express').Router();
const { User, Perfil, Cliente, Conductor, Vendedor } = require('../db');
const { Op, where } = require("sequelize");
const multer = require('multer');
const moment = require('moment');
const fs = require('fs');


genRandonString = (length)=>{
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charLength = chars.length;
    var result = '';
    for ( var i = 0; i < length; i++ ) {
       result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
 }

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

    //whereStatement.fields = ['id','name','email','avatar','status'];

    //{ fields: ['id','name','email','avatar','status'] }

    const user = await User.findAndCountAll(
        {
        include:[Perfil],
        where:whereStatement,
        limit:parseInt(req.query.limit),
        offset:parseInt(req.query.offset)
    });

    res.json(user);
});

router.post('/authuser', async (req,res)=>{
    JWT.verify(req.body.token, 'miclaveultrasecreta123*', function(err, decodedToken) {
        if(err) { /* handle token err */ }
        else {
         //req.userId = decodedToken.id;
         //next();
         const user={
            id:decodedToken.id,
            name:decodedToken.name,
            avatar:decodedToken.avatar,
            email:decodedToken.email,
            status:decodedToken.status,
            role:decodedToken.role
         }
         res.json(user);
        }
      });
});

router.post('/user', async (req,res)=>{

    const usuario = {
        "name":`${req.body.nombres} ${req.body.apellidos}`,
        "nick":req.body.nickname,
        "role":req.body.role,
        "email":req.body.email,
        "password":req.body.password_1,
        "status":"creado",
    };

    const userCreated = await User.create(usuario);

    var estructura = {
        "userId":userCreated.id,
        "nombre":`${req.body.nombres}`,
        "apellido":`${req.body.apellidos}`,
        "tipo_documento":req.body.tipo_documento,
        "documento":req.body.documento,
        "fecha": moment(req.body.fecha,'YYYY-MM-DD').format('YYYY-MM-DD'),
        "direccion":req.body.direccion,
        "telefono":req.body.telefono,
        "email":req.body.email,
    }

    if(req.body.role=="vendedor"){
        const vendedorCreated = await Vendedor.create(estructura);
    }

    if(req.body.role=="conductor"){
        estructura.placa = req.body.placa;
        const conductorCreated = await Conductor.create(estructura);
    }

    if(req.body.role=="cliente"){
        estructura.color = req.body.color;
        const clienteCreated = await Cliente.create(estructura);
    }

    estructura.role = req.body.role;
    estructura.placa = req.body.placa;
    estructura.color = req.body.color;
    const perfilCreated = await Perfil.create(estructura);

    res.json(userCreated);
});

router.post('/user/:id', async (req,res)=>{

    const usuario = {
        "name":`${req.body.nombres} ${req.body.apellidos}`,
        "nick":req.body.nickname,
        "role":req.body.role,
        "email":req.body.email,
        "password":req.body.password_1,
        "status":"creado",
    };

    const userEditado = await User.update(
        usuario,
        {
          where: {
            id:req.params.id
            }
        }
    );

    const userAEditar = await User.findOne({where:{id:req.params.id}});

    //const userCreated = await User.create(usuario);

    var estructura = {
        "nombre":req.body.nombres,
        "apellido":req.body.apellidos,
        "tipo_documento":req.body.tipo_documento,
        "documento":req.body.documento,
        "fecha": moment(req.body.fecha,'YYYY-MM-DD').format('YYYY-MM-DD'),
        "direccion":req.body.direccion,
        "telefono":req.body.telefono,
    }

    if(req.body.role=="vendedor"){
        //const vendedorCreated = await Vendedor.create(estructura);

        const vendedorCreated = await Vendedor.update(
            estructura,
            {
              where: {
                userId:req.params.id
                }
            }
        );
    }

    if(req.body.role=="conductor"){
        estructura.placa = req.body.placa;

        const conductorCreated = await Conductor.update(
            estructura,
            {
              where: {
                userId:req.params.id
                }
            }
        );

        //const conductorCreated = await Conductor.create(estructura);
    }

    if(req.body.role=="cliente"){
        estructura.color = req.body.color;

        const clienteCreated = await Cliente.update(
            estructura,
            {
              where: {
                userId:req.params.id
                }
            }
        );

        //const clienteCreated = await Cliente.create(estructura);
    }

    
        estructura.color = req.body.color;
        estructura.placa = req.body.placa;

        const clienteCreated = await Perfil.update(
            estructura,
            {
              where: {
                userId:req.params.id
                }
            }
        );

        //const clienteCreated = await Cliente.create(estructura);
    

    res.json(userAEditar);
});

saveAvatarUser = () =>{
    const storage = multer.diskStorage({
        destination:(req,file,cb)=>{
            const ruta = './public/images/avatars';

            const path = `${ruta}/${req.body.userAvatar}`;

            fs.unlink(path, (err) => {
                if (err) {
                    console.error('No existe el archivo',err)
                    //return
                }
            })

            cb(null, ruta)
        },
        filename:(req,file,cb)=>{
            const ext = file.originalname.split('.').pop();
            var archivo=`${req.body.userId}_${genRandonString(20)}.${ext}`;
            editarCampoAvatar(req.body.userId,archivo);
            cb(null,archivo)
        }
    });

    return multer({storage});
}

editarCampoAvatar=async(userId,nombreAvatar)=>{
    const usuarioActualizado = await User.update(
        {
            avatar:nombreAvatar
        },
        {
          where: {
            id:userId
            },
        });
}

router.post('/avatar-usuario', saveAvatarUser().single('imgAvatar'), async (req,res)=>{
    res.json({mensaje:"Imagen subida"});
});

router.get('/avatar-usuario/id', async (req,res)=>{
    const user = await User.findAll({where:{
        id:req.query.id
    }});
    res.sendFile(`/src/assets/images/avatars/${user.avatar}`);
});

router.delete('/user/:id', async (req,res)=>{

    const seleccionarUsuario = await User.findOne({where:{id:req.params.id}});
    const ruta = `./public/images/avatars/${seleccionarUsuario.avatar}`;

    fs.unlink(ruta, (err) => {
        if (err) {
            console.error('No existe el archivo',err)
            //return
        }
    })

    const userDeleted = await User.destroy({
        where: {
            id:req.params.id
        }
    });
    res.json(userDeleted);
});

router.get('/user/:id', async (req,res)=>{

    /*
    var includes=[];

    if(req.query.tipo=="vendedores"){
        includes[0]={
            model:Vendedor,
            as:'vendedor'
        }
    }

    if(tipo=="conductores"){
        includes[0]={
            model:Conductor,
            as:'conductor'
        }
    }

    if(tipo=="clientes"){
        includes[0]={
            model:Cliente,
            as:'cliente'
        }
    }*/

    const user = await User.findOne({
        where: {
            id:req.params.id
        },
        include :[Vendedor,Cliente,Conductor,Perfil]
    });
    res.json(user);
});


module.exports=router;