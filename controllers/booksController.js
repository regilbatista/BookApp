const books = require("../models/books");
const loan = require("../models/loan");
const categorys = require("../models/categorys");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.getBook = (req, res, next) => {
    // Primero obtenemos los ids de los libros que están en loans
    loan.findAll({
        attributes: ['id_books'],
        where: {
            date_devolution: null // Filtrar por préstamos que no han sido devueltos
        }
    }).then((loanResults) => {

        const loanedBookIds = loanResults.map((loan) => loan.dataValues.id_books);
        // Luego obtenemos los libros que no están en la lista de loanedBookIds
        books.findAll({
            where: {
                id: {
                    [Op.notIn]: loanedBookIds
                }
            },
            include: [{model: categorys}]
        }).then((bookResults) => {
            categorys.findAll().then((categoryResults) => {
                const categories = categoryResults.map((category) => category.dataValues);
                const books = bookResults.map((book) => book.dataValues);
                res.render("libros/index", {
                    pageTitle: "Libros", 
                    homeActive: true,
                    books: books,
                    categorys: categories,
                    hasbooks: books.length > 0,
                });
            }).catch((categoryErr) => {
                console.log(categoryErr);
            });
        }).catch((bookErr) => {
            console.log(bookErr);
        });
    }).catch((loanErr) => {
        console.log(loanErr);
    });
};

exports.postfoundBook = (req, res, next) => {
    const name = req.body.book;
    console.log(name);

    // Primero obtenemos los ids de los libros que están en loans
    loan.findAll({
        attributes: ['id_books']
    }).then((loanResults) => {
        const loanedBookIds = loanResults.map((loan) => loan.dataValues.id_books);

        // Luego buscamos los libros que coinciden con el nombre y no están en préstamo
        books.findAll({
            where: {
                name: {
                    [Op.like]: `${name}%`
                },
                id: {
                    [Op.notIn]: loanedBookIds
                }
            },
            include: [{ model: categorys }]
        }).then((bookResults) => {
            categorys.findAll().then((categoryResults) => {
                const categories = categoryResults.map((category) => category.dataValues);
                const books = bookResults.map((book) => book.dataValues);

                if (!books.length) {
                    return res.redirect("/");
                }

                res.render("libros/index", {
                    pageTitle: "Libros",
                    homeActive: true,
                    books: books,
                    categorys: categories,
                    hasbooks: books.length > 0,
                });
            }).catch((categoryErr) => {
                console.log(categoryErr);
            });
        }).catch((bookErr) => {
            console.log(bookErr);
        });
    }).catch((loanErr) => {
        console.log(loanErr);
    });
};

exports.postfilterBook = (req, res, next) => {
    const filter = req.body.category;
    console.log(filter);

    // Primero obtenemos los ids de los libros que están en loans
    loan.findAll({
        attributes: ['id_books']
    }).then((loanResults) => {
        const loanedBookIds = loanResults.map((loan) => loan.dataValues.id_books);

        // Luego filtramos los libros por categoría y que no están en préstamo
        books.findAll({
            where: {
                categoryId: filter,
                id: {
                    [Op.notIn]: loanedBookIds
                }
            },
            include: [{ model: categorys }]
        }).then((bookResults) => {
            categorys.findAll().then((categoryResults) => {
                const categories = categoryResults.map((category) => category.dataValues);
                const books = bookResults.map((book) => book.dataValues);

                if (!books.length) {
                    return res.redirect("/");
                }

                res.render("libros/index", {
                    pageTitle: "Libros",
                    homeActive: true,
                    books: books,
                    categorys: categories,
                    hasbooks: books.length > 0,
                    filter: true,
                });
            }).catch((categoryErr) => {
                console.log(categoryErr);
            });
        }).catch((bookErr) => {
            console.log(bookErr);
        });
    }).catch((loanErr) => {
        console.log(loanErr);
    });
};



exports.getSelectedBook = (req, res, next) => {
    const selected = req.query.select;
    const bookId = req.params.bookId;

    if (!selected) {
        return res.redirect("/");
    }

    books.findOne({ include: [{ model: categorys }], where: { id: bookId } })
        .then((result) => {
            if (!result) {
                return res.redirect("/");
            }

            const book = result.dataValues;

            loan.findOne({ where: { id_books: bookId ,  
                date_devolution: null} })
                .then((loanResult) => {
                    const isLoan = !!loanResult; // Si loanResult no es nulo, entonces isLoan es true

                    res.render("libros/selected", {
                        pageTitle: "Seleccionar Libro",
                        book: book,
                        hasbooks: !!book, // Si book no es nulo, entonces hasbooks es true
                        isLoan: isLoan
                    });
                })
                .catch((loanErr) => {
                    console.log(loanErr);
                    res.redirect("/");
                });
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/");
        });
};

