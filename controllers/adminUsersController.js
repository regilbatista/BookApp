const Usuarios = require("../models/users");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require("bcryptjs");
const transporter = require("../services/emailService");
let isLoggedIn = false;

  exports.getUserslist = (req, res, next) => {

    Usuarios.findAll().then((result) => {
    const users = result.map((result) => result.dataValues );
    console.log(users.dataValues);
    res.render("admin/users/users-list",
    {pageTitle: "Usesr-list", 
    usersActive: true,
    users: users,
    hasUsers: users.length > 0,
      });
    }).catch(err => {
        console.log(err);
    });

};

  
  exports.getUsers = (req, res, next) => {
    
    res.render("admin/users/save-users", { 
    pageTitle: "Agregar-users",
    usersActive: true,
    editMode: false,
    });
  
};


exports.PostAddUsers = (req, res, next) => {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const correo = req.body.email;
  const usuario = req.body.user;
  const contrasena = req.body.password;
  const confirmPassword = req.body.confirmpassword;
  const admin = req.body.rol;
  if(name === "" || lastname === "" || correo === "" || usuario === "" || contrasena === "" || confirmPassword === ""){
    req.flash("errors","Todos los campos son obligatorios");
    return res.redirect("/admin/add-users");
  }

  if(contrasena !== confirmPassword){
    req.flash("errors","Las contraseñas no coinciden");
    return res.redirect("/admin/add-users");
  }
  Usuarios.findOne({where: {usuario: usuario}}).then(user=>{
    if(user){
      req.flash("errors","El usuario ya existe");
      return res.redirect("/admin/add-users");
    }

  
  bcrypt.hash(contrasena,12).then(hasedPassword =>{
  
    Usuarios.create({name: name, correo: correo , lastname: lastname,usuario: usuario, contrasena: hasedPassword, admin: admin }).then(result=>{
      const user = result.dataValues;
      res.redirect("/admin/users");
      
  }).catch(err=>{
    console.log(err);
    return res.redirect("/admin/add-users");
  });

  }).catch(err=>{
    console.log(err);
    return res.redirect("/admin/add-users");
  });

}).catch(err=>{
  console.log(err);
  return res.redirect("/admin/add-users");
})

};


exports.getEditUser = (req, res, next) => {
    const edit = req.query.edit;
    const userId = req.params.userId;

    if(!edit){
        return res.redirect("/admin/users");
    }

    Usuarios.findOne({where: {id: userId}}).then((result) => {
        const user = result.dataValues;
       

                res.render("admin/users/save-users",
                    {pageTitle: "Editar-users", 
                    usersActive: true,
                    editMode: edit,
                    user: user,
                  });
    }).catch(err => {
        req.flash("errors", "Ocurrió un error al buscar el usuario");
            console.log(err);
            return res.redirect("/admin/users");
        });
};

exports.postEditUser = (req, res, next) => {
    const name = req.body.name;
    const lastname = req.body.lastname;
    const correo = req.body.email;
    const usuario = req.body.user;
    const admin = req.body.rol;
    const id = req.body.userId;
    if(name === "" || lastname === "" || correo === "" || usuario === ""){
        req.flash("errors","Todos los campos son obligatorios");
        return res.redirect("/admin/add-users");
      }
    Usuarios.findOne({where: {id: id}}).then((result) => {

        const user = result.dataValues;

        if(!user){ 
            req.flash("errors","usuario no encontrado");
            return res.redirect("/admin/add-users");
           
        }

    Usuarios.update({name: name, lastname: lastname, correo: correo, usuario: usuario, admin: admin}, {where: {id: id}})
    .then((result) => {
        return res.redirect("/admin/users");
    }).catch((err) => {
        console.log(err);
    });
}).catch((err) => {
    console.log(err);
});
    
};


        function generateP() {
            var pass = '';
            var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
                    'abcdefghijklmnopqrstuvwxyz0123456789@#$';
              
            for (i = 1; i <= 8; i++) {
                var char = Math.floor(Math.random()
                            * str.length + 1);
                  
                pass += str.charAt(char)
            }
              
            return pass;
        }
