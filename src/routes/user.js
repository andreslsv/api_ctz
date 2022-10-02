const router = require('express').Router();
const { User, Perfil, Cliente, Conductor, Vendedor } = require('../db');
const { Op, where } = require("sequelize");
const multer = require('multer');


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
            status:decodedToken.status
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
        "status":2,
    };

    const userCreated = await User.create(usuario);

    var estructura = {
        "userId":userCreated.id,
        "nombre":`${req.body.nombres} ${req.body.apellidos}`,
        "tipo_documento":req.body.tipo_documento,
        "documento":req.body.documento,
        "fecha":req.body.documento,
        "direccion":req.body.direccion,
        "telefono":req.body.telefono,
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

    res.json(userCreated);
});

saveAvatarUser = () =>{
    const storage = multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null, '../CTZ/src/assets/images/avatars')
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
    res.sendFile(`../CTZ/src/assets/images/avatars/${user.avatar}`);
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