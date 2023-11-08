var express = require('express');
var pacientesApp = require("../app/pacientes/controller/ctlPacientes")

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
router.get('/', authenticationMiddleware, pacientesApp.getAllPacientes);
router.get('/openPacientesInsert', authenticationMiddleware, pacientesApp.openPacientesInsert);
router.get('/openPacientesUpdate/:id', authenticationMiddleware, pacientesApp.openPacientesUpdate);

/* POST métodos */
router.post('/insertPacientes', authenticationMiddleware, pacientesApp.insertPacientes);
router.post('/getDados', authenticationMiddleware, pacientesApp.getDados);
router.post('/updatePacientes', authenticationMiddleware, pacientesApp.updatePacientes);
router.post('/deletePacientes', authenticationMiddleware, pacientesApp.deletePacientes);




module.exports = router;