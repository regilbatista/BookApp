const books = require("../models/books");
const categorys = require("../models/categorys");
const transporter = require("../services/emailService");

exports.getBooklist = (req, res, next) => {

    books.findAll({include:[{model: categorys}]}).then((result) => {
    const book = result.map((result) => result.dataValues );
    console.log(book.dataValues);
    res.render("admin/books/books-list",
    {pageTitle: "books-list", 
    pokeActive: true,
    books: book,
    hasbooks: book.length > 0,
      });
    }).catch(err => {
        console.log(err);
    });

};

exports.getAddBook = (req, res, next) => {
    
    categorys.findAll().then((result) => {

            const category = result.map((result) => result.dataValues );
            
            res.render("admin/books/save-books",
            {pageTitle: "Agregar-books",
            pokeActive: true,
            editMode: false,
            categorys: category,
            hascategorys: category.length > 0,
        });

      
    }).catch(err => {
        console.log(err);
    });
};

exports.postDeleteBook = (req, res, next) => {
    
    const bookId = req.body.bookId;

    books.destroy({where: {id: bookId}}).then((result) => {
        res.redirect("/admin/books");
    }).catch((err) => {
        console.log(err);
    });
};

exports.postAddBook = (req, res, next) => {
    const name = req.body.name;
    const image = req.file;
    const date = req.body.date;
    const category = req.body.category;

    if(!image){
        return res.redirect("/admin/books");
    }

    books.create({name: name, imagePath: "/" + image.path , datep: date, categoryId: category}).then((result) => {

        res.redirect("/admin/books");
        }).catch((err) => { 
            console.log(err);
        } );
    

    
};

exports.getEditBook = (req, res, next) => {
    const edit = req.query.edit;
    const bookId = req.params.bookId;

    if(!edit){
        return res.redirect("/admin/books");
    }

    books.findOne({where: {id: bookId}}).then((result) => {
        const book = result.dataValues;
        if(!book){
            return res.redirect("/admin/books");
        }

        categorys.findAll().then((result2) => {
        
        
                const category = result2.map((result2) => result2.dataValues );
                console.log (category.length > 0);
          
                res.render("admin/books/save-books",
                    {pageTitle: "Editar-books", 
                    pokeActive: true,
                    editMode: edit,
                    book: book,
                    categorys: category,
                    hascategorys: category.length > 0,
            });
    
        }).catch(err2 => {
            console.log(err2);
        });
    
    }).catch(err => {
            console.log(err);
        });

   
    
};

exports.postEditBook = (req, res, next) => {
    const name = req.body.name;
    const image = req.file;
    const date = req.body.date;
    const category = req.body.category;
    const id = req.body.bookId;

    books.findOne({where: {id: id}}).then((result) => {

        const book = result.dataValues;

        if(!book){
            return res.redirect("/admin/books");
        }

        const imagePath = image ? "/" + image.path : book.imagePath;

    books.update({name: name, imagePath: imagePath, datep: date, categoryId: category}, {where: {id: id}})
    .then((result) => {
        return res.redirect("/admin/books");
    }).catch((err) => {
        console.log(err);
    });
}).catch((err) => {
    console.log(err);
});
    
};

