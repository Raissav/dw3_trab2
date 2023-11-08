var express = require('express');
var medicosApp = require("../app/medicos/controller/ctlMedicos")

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
router.get('/', authenticationMiddleware, medicosApp.getAllMedicos);
router.get('/openMedicosInsert', authenticationMiddleware, medicosApp.openMedicosInsert);
router.get('/openMedicosUpdate/:id', authenticationMiddleware, medicosApp.openMedicosUpdate);

/* POST métodos */
router.post('/insertMedicos', authenticationMiddleware, medicosApp.insertMedicos);
router.post('/getDados', authenticationMiddleware, medicosApp.getDados);
router.post('/updateMedicos', authenticationMiddleware, medicosApp.updateMedicos);
router.post('/deleteMedicos', authenticationMiddleware, medicosApp.deleteMedicos);




module.exports = router;