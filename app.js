const path = require('path');
const express = require('express');
const HANDLEBARS = require('handlebars');
const {engine} = require("express-handlebars");
const sequelize = require("./util/database");
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const Books = require("./models/books");
const Usuario = require("./models/users");
const Categorys = require("./models/categorys");
const Editorials = require("./models/editorials");
const Writers = require("./models/writers");
const flash = require("connect-flash");

const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const session = require("express-session");

const compareHelpers = require("./util/helpers/hbs/compare");
const errorController = require("./controllers/errorController");


const app = express();
app.engine("hbs", engine({
    layousDir: "views/layouts/", 
    defaultLayout: "main-layout", 
    extname: "hbs",
    helpers:{
        equals: compareHelpers.equals,
       },
    handlebars: allowInsecurePrototypeAccess(HANDLEBARS),
    }, 
    ));
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,"public")));
app.use("/images",express.static(path.join(__dirname,"images")));
app.use(session({secret:"anything", resave: false, saveUninitialized: false}));
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, `${uuidv4()}-${file.originalname}`);
    },
});

app.use(session({secret:"anything", resave: false, saveUninitialized: false}));
app.use(flash());

app.use((req,res,next)=>{
    const errors = req.flash("errors");

    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.isAdmin = req.session.userdata?.admin;
    res.locals.userd = req.session.userdata;
    res.locals.errorMessages = errors;
    res.locals.hasErrorMessages = errors.length > 0;
    next();
})

app.use(multer({storage: imageStorage}).single("image"));
const booksRouter = require("./routes/books");
const loginRouter = require("./routes/login");
const adminBookRouter = require("./routes/adminBook");
const adminCategoryRouter = require("./routes/adminCategory");
const adminWriterRouter = require("./routes/adminWriter");
const adminEditorialRouter = require("./routes/adminEditorial");
const adminUsersRouter = require("./routes/adminUsers");

app.use("/admin",adminBookRouter);
app.use("/admin",adminCategoryRouter);
app.use("/admin",adminWriterRouter);
app.use("/admin",adminEditorialRouter);
app.use("/admin",adminUsersRouter);
app.use(loginRouter);
app.use(booksRouter);

app.use(errorController.Get404);

Books.belongsTo(Categorys, {constraints: true, onDelete: "CASCADE"});
Categorys.hasMany(Books);
Books.belongsTo(Writers, {constraints: true, onDelete: "CASCADE"});
Writers.hasMany(Books);
Books.belongsTo(Editorials, {constraints: true, onDelete: "CASCADE"});
Editorials.hasMany(Books);


sequelize.sync({ force: false }).then(result => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
});
