var express = require('express');
var consultasApp = require("../app/consultas/controller/ctlConsultas")

////var login = require("../controllers/login/login")
var router = express.Router();
//const passport = require('passport');



//Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
    // Verificar se existe uma sessão válida.
    isLogged = req.session.isLogged;    
  
    if (!isLogged) {      
      res.redirect("/Login");
    }
    next();
}; 
  
/* GET métodos */
router.get('/', authenticationMiddleware, consultasApp.getAllConsultas);
router.get('/insertConsultas', authenticationMiddleware, consultasApp.insertConsultas);
router.get('/viewConsultas/:id/:oper', authenticationMiddleware, consultasApp.viewConsultas);

/* POST métodos */
router.post('/insertConsultas', authenticationMiddleware, consultasApp.insertConsultas);
router.post('/DeleteConsultas', authenticationMiddleware, consultasApp.DeleteConsultas);
router.post('/viewConsultas', authenticationMiddleware, consultasApp.viewConsultas);


module.exports = router;
