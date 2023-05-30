const books = require("../models/books");
const categorys = require("../models/categorys");
const editorials = require("../models/editorials");
const writers = require("../models/writers");
const transporter = require("../services/emailService");

exports.getBooklist = (req, res, next) => {

    books.findAll({include:[{model: categorys},{model: editorials},{model: writers}]}).then((result) => {
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
        editorials.findAll().then((result2) => {
            writers.findAll().then((result3) => {

            const category = result.map((result) => result.dataValues );
            const editorial = result2.map((result2) => result2.dataValues );
            const writer = result3.map((result3) => result3.dataValues );
            
            res.render("admin/books/save-books",
            {pageTitle: "Agregar-books",
            pokeActive: true,
            editMode: false,
            categorys: category,
            editorials: editorial,
            writers: writer,
            hascategorys: category.length > 0,
            haseditorials: editorial.length > 0,
            haswriters: writer.length > 0,
        });

            }).catch(err3 => {
                console.log(err3);
            });
        }).catch(err2 => {
            console.log(err2);
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
    const writer = req.body.writer;
    const category = req.body.category;
    const editorial = req.body.editorial;

    if(!image){
        return res.redirect("/admin/books");
    }

    books.create({name: name, imagePath: "/" + image.path , datep: date, categoryId: category, writerId: writer, editorialId: editorial}).then((result) => {

    writers.findOne({where: {id: writer}}).then((result2) => {
        const wri = result2.dataValues;
        if(!wri){   
            alert("No se encontro el escritor");
        }
        const email = wri.email;
         res.redirect("/admin/books");
        transporter.sendMail({
        
            from: "BookApp notification ",
            to: email,
            subject: `Nuevo libro publicado ${name}`,
            html: "<strong> Se ha publicado un nuevo libro</strong> <br><br> <p>Se publicó un libro de su autoría <strong> llamado: "+name+" </strong>. Gracias por ser parte de BookApp</p>"},
            (err3) => {
                console.log(err3);
            });

        }).catch(err2 => {
            console.log(err2);  
        });

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
            editorials.findAll().then((result3) => {
                writers.findAll().then((result4) => {
        
                const category = result2.map((result2) => result2.dataValues );
                const editorial = result3.map((result3) => result3.dataValues );
                const writer = result4.map((result4) => result4.dataValues );
                console.log (category.length > 0);
                console.log (editorial.length > 0);
                res.render("admin/books/save-books",
                    {pageTitle: "Editar-books", 
                    pokeActive: true,
                    editMode: edit,
                    book: book,
                    categorys: category,
                    editorials: editorial,
                    writers: writer,
                    hascategorys: category.length > 0,
                    haseditorials: editorial.length > 0,
                    haswriters: writer.length > 0,});
                }).catch(err4 => {
                    console.log(err4);
                });
            }).catch(err3 => {
                console.log(err3);
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
    const writer = req.body.writer;
    const category = req.body.category;
    const editorial = req.body.editorial;
    const id = req.body.bookId;

    books.findOne({where: {id: id}}).then((result) => {

        const book = result.dataValues;

        if(!book){
            return res.redirect("/admin/books");
        }

        const imagePath = image ? "/" + image.path : book.imagePath;

    books.update({name: name, imagePath: imagePath, datep: date, categoryId: category, writerId: writer, editorialId: editorial}, {where: {id: id}})
    .then((result) => {
        return res.redirect("/admin/books");
    }).catch((err) => {
        console.log(err);
    });
}).catch((err) => {
    console.log(err);
});
    
};

