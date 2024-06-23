module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        req.flash("errors", "No tiene permisos para acceder a esta página, inicie sesión");
        return res.redirect("/login");
    } 

    console.log(!res.locals.isAdmin)

    if (!res.locals.isAdmin) {
        req.flash("errors", "No tiene permisos para acceder a esta página");
        return res.redirect("/");
    }

    next();
};
