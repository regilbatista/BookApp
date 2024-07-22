const books = require("../models/books");
const loan = require("../models/loan");
const categorys = require("../models/categorys");
const moment = require('moment');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

exports.postAddloan = (req, res, next) => {
    const id_book = req.body.bookId;
    const id_users= req.session.userdata.id;
    const date = Date.now();
    const dateDel = addDays(date, 7);

// Agregar 7 días (7 días * 24 horas * 60 minutos * 60 segundos * 1000 milisegundos)


    if(!id_users){
        return res.redirect("/admin/books");
    }

    loan.create({id_books: id_book, id_user: id_users , date_loan: date, date_ToDev: dateDel }).then((result) => {
        console.log(result);
        res.redirect("/loans");
        }).catch((err) => { 
            console.log(err);
        } );
    
};

exports.postMyloads = (req, res, next) => {
    const name = req.body.book;
    console.log(name);

     books.findAll({ include:[{model: categorys}], where: { name: { [Op.like]: `${name+'%'}` } } }).then((result) => {
        categorys.findAll().then((result2) => {
        const category = result2.map((result2) => result2.dataValues );
        const book = result.map((result) => {return result.dataValues}  );
        if(!book){
            return res.redirect("/");
        }
        res.render("libros/loans",
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

exports.getLoansByUser = async (req, res, next) => {
    const userId = req.session.userdata.id;

    console.log(userId, 'userId');
    if (!userId) {
        return res.redirect("/");
    }

    try {
        const loanResults = await loan.findAll({
            include: [
                {
                    model: books,
                    include: [
                        {
                            model: categorys // Incluir la categoría de los libros
                        }
                    ]
                }
            ],
            where: { id_user: userId }
        });

        if (!loanResults || loanResults.length === 0) {
            res.render("libros/myLoans", {
                pageTitle: "Préstamos del Usuario",
                loansActive: true,
                loans: [],
                hasloans: false
            });
            return;
        }

        console.log(loanResults, 'loanResults');

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

        console.log(loansData, 'loansData');

        res.render("libros/myLoans", {
            pageTitle: "Préstamos del Usuario",
            loansActive: true,
            loans: loansData,
            hasloans: loansData.length > 0
        });

    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
};





exports.postDelBook = (req, res, next) => {
 
    const date = Date.now();
    const id = req.body.loanId;

    loan.findOne({where: {id: id}}).then((result) => {

        const book = result.dataValues;

        if(!book){ 
            req.flash("errors","No se a encotrado este libro en los que ha tomado prestado")
            return res.redirect("/loans");
        }

        loan.update({date_devolution: date}, {where: {id: id}})
    .then((result) => {
        return res.redirect("/loans");
    }).catch((err) => {
        console.log(err);
    });
}).catch((err) => {
    console.log(err);
});
    
};