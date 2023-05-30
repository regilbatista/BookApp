const writers = require("../models/writers");
const books = require("../models/books");

exports.getWriterlist = (req, res, next) => {

    writers.findAll({include:[{model: books}]}).then((result) => {

    const writer = result.map((result) => result.dataValues );
    res.render("admin/writers/writer-list",
    {pageTitle: "Escritores-list", 
    writersActive: true,
    writers: writer,
    haswriters: writer.length > 0,
      });
    }).catch(err => {
        console.log(err);
    });

};

exports.getAddWriter = (req, res, next) => {
    res.render("admin/writers/save-writer",
    {pageTitle: "Agregar-Escritores",
    writersActive: true,
     editMode: false});
};

exports.postDeleteWriter = (req, res, next) => {
    
    const writerid = req.body.writeId;

    writers.destroy({where: {id: writerid}}).then((result) => {
        res.redirect("/admin/writers");
    }).catch((err) => {
        console.log(err);
    });
};

exports.postAddWriter = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;


    writers.create({name: name, email: email}).then((result) => {
         res.redirect("/admin/writers");
        }).catch((err) => { 
            console.log(err);
        } );
    

    
};

exports.getEditWriter = (req, res, next) => {
    const edit = req.query.edit;
    const writerid = req.params.writerId;

    if(!edit){
        return res.redirect("/admin/writers");
    }

    writers.findOne({where: {id: writerid}}).then((result) => {
        const writer = result.dataValues;
        if(!writer){
            return res.redirect("/admin/writers");
        }
        res.render("admin/writers/save-writer",
        {pageTitle: "Editar-Escritores", 
        writersActive: true,
        editMode: edit,
        writer: writer});
    
    }).catch(err => {
            console.log(err);
        });

   
    
};

exports.postEditWriter = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const id = req.body.writeId;

    writers.update({name: name, email: email}, {where: {id: id}})
    .then((result) => {
        return res.redirect("/admin/writers");
    }).catch((err) => {
        console.log(err);
    });
};

