const categorys = require("../models/categorys");
const books = require("../models/books");

exports.getCategorylist = (req, res, next) => {

    categorys.findAll({include:[{model: books}]}).then((result) => {

    const category = result.map((result) => result.dataValues);
    console.log(books.length);
    res.render("admin/categorys/category-list",
    {pageTitle: "Tipos-list", 
    categoryActive: true,
    categorys: category,
    hascategorys: category.length > 0,
      });
    }).catch(err => {
        console.log(err);
    });

};

exports.getAddCategory = (req, res, next) => {
    res.render("admin/categorys/save-category",
    {pageTitle: "Agregar-Tipos",
     categoryActive: true,
     editMode: false});
};

exports.postDeleteCategory = (req, res, next) => {
    
    const categoryid = req.body.categoryId;

    categorys.destroy({where: {id: categoryid}}).then((result) => {
        res.redirect("/admin/categorys");
    }).catch((err) => {
        console.log(err);
    });
};

exports.postAddCategory = (req, res, next) => {
    const name = req.body.name;
    const descrip = req.body.description;
    

    categorys.create({name: name, description: descrip}).then((result) => {
         res.redirect("/admin/categorys");
        }).catch((err) => { 
            console.log(err);
        } );
    

    
};

exports.getEditCategory = (req, res, next) => {
    const edit = req.query.edit;
    const categoryid = req.params.categoryId;

    if(!edit){
        return res.redirect("/admin/categorys");
    }

    categorys.findOne({where: {id: categoryid}}).then((result) => {
        const category = result.dataValues;
        if(!category){
            return res.redirect("/admin/categorys");
        }

        res.render("admin/categorys/save-category",
        {pageTitle: "Editar-Tipos", 
        categoryActive: true,
        editMode: edit,
        category: category});
    
    }).catch(err => {
            console.log(err);
        });

   
    
};

exports.postEditCategory = (req, res, next) => {
    const name = req.body.name;
    const descrip = req.body.description;
    const id = req.body.categoryId;

    categorys.update({name: name, description: descrip}, {where: {id: id}})
    .then((result) => {
        return res.redirect("/admin/categorys");
    }).catch((err) => {
        console.log(err);
    });
};

