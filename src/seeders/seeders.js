const { Role,User,Perfil } = require('../db');

crearUsuario=async()=>{
    try {
        await User.create({
            name:"admin",
            nick:"admin",
            role:"administrador",
            status:"creado",
            email:"admin@gmail.com",
            password:"1234567",
            avatar:"admin-box.jpg",
            perfil:{
                nombre:"admin  ",
                apellido:"box",
                tipo_documento:"cc",
                documento:"65465456465",
                direccion:"#",
                telefono:"3143063929",
                email:"admin@gmail.com",
                fecha:"15-10-2022",
                estado:"creado",
                role2Id:1
            }
        }
        );
    } catch (error) {
        console.log("Error al crear usuario", error);
    }

}


crearRoles=async(element)=>{
    await Role.create({
        nombre:'administrador',
        descripcion:'...'
    });
    await Role.create({
        nombre:'vendedor',
        descripcion:'...'
    });
    await Role.create({
        nombre:'conductor',
        descripcion:'...'
    });
    await Role.create({
        nombre:'cliente',
        descripcion:'...'
    });

    await crearUsuario();
}


crearRoles();

