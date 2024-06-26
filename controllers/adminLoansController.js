const books = require("../models/books");
const loan = require("../models/loan");
const categorys = require("../models/categorys");
const moment = require('moment');
const Sequelize = require("sequelize");
const Usuarios = require("../models/users");
const Op = Sequelize.Op;

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}


exports.getLoans = (req, res, next) => {
    loan.findAll({
        include: [
            {
                model: books,
                include: [
                    {
                        model: categorys // Incluir la categoría de los libros
                    }
                ]
            },
            {
                model: Usuarios // Incluir los datos del usuario que realizó el préstamo
            }
        ]
    })
    .then((loanResults) => {
        if (!loanResults || loanResults.length === 0) {
            return {
                loansData: [],  // Devolver un objeto con loansData como un arreglo vacío
                bookResults: [] // También devolver un arreglo vacío de bookResults
            };
        }

        // Mapear y formatear los resultados de los préstamos
        const loansData = loanResults.map((loan) => {
            const formattedLoan = {
                ...loan.dataValues,
                book: loan.book.dataValues // Incluir los datos del libro prestado
            };

            // Formatear fechas si es necesario
            formattedLoan.date_loan = moment(formattedLoan.date_loan).format('ddd MMM DD YYYY');
            formattedLoan.date_ToDev = moment(formattedLoan.date_ToDev).format('ddd MMM DD YYYY');
            if (formattedLoan.date_devolution) {
                formattedLoan.date_devolution = moment(formattedLoan.date_devolution).format('ddd MMM DD YYYY');
            }

            return formattedLoan;
        });

        console.log(loansData,'loansData')


        res.render("admin/loans/loans-list", {
            pageTitle: "Préstamos del Usuario",
            loansActive: true,
            loans: loansData,
            hasloans: loansData.length > 0
        });
    })
    .catch((err) => {
        console.log(err);
        res.redirect("/");
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

