const books = require("../models/books");
const categorys = require("../models/categorys");
const editorials = require("../models/editorials");
const writers = require("../models/writers");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
exports.getBook = (req, res, next) => {
    books.findAll({include:[{model: categorys},{model: editorials},{model: writers}]}).then((result) => {
        categorys.findAll().then((result2) => {
        const category = result2.map((result2) => result2.dataValues );
        const book = result.map((result) => result.dataValues );
        res.render("libros/index",
        {pageTitle: "Libros", 
        homeActive: true,
        books: book,
        categorys: category,
        hasbooks: book.length > 0,
          });
         }).catch(err2 => {
            console.log(err2);
         });
        }).catch(err => {
            console.log(err);
        });
};

exports.postfoundBook = (req, res, next) => {
    const name = req.body.book;
    console.log(name);

     books.findAll({ include:[{model: writers},{model: categorys},{model: editorials}], where: { name: { [Op.like]: `${name+'%'}` } } }).then((result) => {
        categorys.findAll().then((result2) => {
        const category = result2.map((result2) => result2.dataValues );
        const book = result.map((result) => {return result.dataValues}  );
        if(!book){
            return res.redirect("/");
        }
        res.render("libros/index",
        {pageTitle: "Libros", 
        homeActive: true,
        books: book,
        categorys: category,
        hasbooks: book.length > 0,
          });
        }).catch(err2 => {
            console.log(err2);
      });
    }).catch((err) => {
        console.log(err);
    });
};

exports.postfilterBook = (req, res, next) => {
    const filter = req.body.category;
    console.log(filter);

     books.findAll({ include:[{model: categorys},{model: editorials},{model: writers}], where: { categoryId: filter} }).then((result) => {
        categorys.findAll().then((result2) => {
        const category = result2.map((result2) => result2.dataValues );
        const book = result.map((result) => {return result.dataValues}  );
        if(!book){
            return res.redirect("/");
        }
        res.render("libros/index",
        {pageTitle: "Libros", 
        homeActive: true,
        books: book,
        categorys: category,
        hasbooks: book.length > 0,
        filer: true,
          });
        }).catch(err2 => {
            console.log(err2);
      });
    }).catch((err) => {
        console.log(err);
    });
};

exports.getSelectedBook = (req, res, next) => {
    const selected = req.query.select;
    const bookId = req.params.bookId;

    if(!selected){ 
        return res.redirect("/");
    }

    books.findOne({include:[{model: categorys},{model: editorials},{model: writers}], where: {id: bookId}}).then((result) => {
        const book = result.dataValues;
        if(!book){
            return res.redirect("/");
        }
                res.render("libros/selected",
                    {pageTitle: "Seleccionar Libro",
                    book: book,
                    hasbooks: book.length > 0,});
                }).catch(err => {
                    console.log(err);
                });   
    
};
