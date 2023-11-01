const express = require("express");
const routerApp = express.Router();

const appPacientes = require("../apps/pacientes/controller/ctlPacientes");
const appMedicos = require("../apps/medicos/controller/ctlMedicos");
const appConsultas = require("../apps/consultas/controller/ctlConsultas");
const appLogin = require("../apps/login/controller/ctlLogin");

// middleware that is specific to this router
routerApp.use((req, res, next) => {
  next();
});

routerApp.get("/", (req, res) => {
  res.send("Olá mundo!");
});

//Rotas de Pacientes
routerApp.get("/getAllPacientes", appPacientes.getAllPacientes);
routerApp.post("/getPacientesByID", appLogin.AutenticaJWT, appPacientes.getPacientesByID);
routerApp.post("/insertPacientes", appLogin.AutenticaJWT, appPacientes.insertPacientes);
routerApp.post("/updatePacientes", appPacientes.updatePacientes);
routerApp.post("/DeletePacientes", appPacientes.DeletePacientes);

//Rotas de Medicos
routerApp.get("/GetAllMedicos", appMedicos.GetAllMedicos);
routerApp.post("/GetMedicosByID", appMedicos.GetMedicosByID);
routerApp.post("/InsertMedicos", appMedicos.InsertMedicos);
routerApp.post("/UpdateMedicos", appMedicos.UpdateMedicos);
routerApp.post("/DeleteMedicos", appMedicos.DeleteMedicos);

//Rotas de Consultas
routerApp.get("/getAllConsultas", appConsultas.getAllConsultas);
routerApp.post("/getConsultasByID", appConsultas.getConsultasByID);
routerApp.post("/insertConsultas", appConsultas.insertConsultas);
routerApp.post("/updateConsultas", appConsultas.updateConsultas);
routerApp.post("/DeleteConsultas", appConsultas.DeleteConsultas);

// Rota Login
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;
