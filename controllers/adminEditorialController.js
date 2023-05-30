const editorials = require("../models/editorials");
const books = require("../models/books");

exports.getEditoriallist = (req, res, next) => {

    editorials.findAll({include:[{model: books}]}).then((result) => {

    
    const editorial = result.map((result) => result.dataValues );
    res.render("admin/editorials/editorial-list",
    {pageTitle: "Editoriales-list", 
    editorialsActive: true,
    editorials: editorial,
    haseditorials: editorial.length > 0,
      });
    }).catch(err => {
        console.log(err);
    });

};

exports.getAddEditorial = (req, res, next) => {
    res.render("admin/editorials/save-editorial",
    {pageTitle: "Agregar-Editoriales",
    editorialsActive: true,
     editMode: false});
};

exports.postDeleteEditorial = (req, res, next) => {
    
    const editorialid = req.body.ediId;

    editorials.destroy({where: {id: editorialid}}).then((result) => {
        res.redirect("/admin/editorials");
    }).catch((err) => {
        console.log(err);
    });
};

exports.postAddEditorial = (req, res, next) => {
    const name = req.body.name;
    const tel = req.body.phone;
    const country = req.body.country;


    editorials.create({name: name, phone: tel, country: country}).then((result) => {
         res.redirect("/admin/editorials");
        }).catch((err) => { 
            console.log(err);
        } );
    

    
};

exports.getEditEditorial = (req, res, next) => {
    const edit = req.query.edit;
    const editorialid = req.params.editorialId;

    if(!edit){
        return res.redirect("/admin/editorials");
    }

    editorials.findOne({where: {id: editorialid}}).then((result) => {
        const editorial = result.dataValues;
        if(!editorial){
            return res.redirect("/admin/editorials");
        }

        res.render("admin/editorials/save-editorial",
        {pageTitle: "Editar-Editoriales", 
        editorialsActive: true,
        editMode: edit,
        editorial: editorial});
    
    }).catch(err => {
            console.log(err);
        });

   
    
};

exports.postEditEditorial = (req, res, next) => {
    const name = req.body.name;
    const tel = req.body.phone;
    const country = req.body.country;
    const id = req.body.ediId;

    editorials.update({name: name, phone: tel, country: country }, {where: {id: id}})
    .then((result) => {
        return res.redirect("/admin/editorials");
    }).catch((err) => {
        console.log(err);
    });
};

