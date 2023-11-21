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
routerApp.get("/getAllPacientes", appLogin.AutenticaJWT, appPacientes.getAllPacientes);
routerApp.post("/getPacientesByID", appLogin.AutenticaJWT, appPacientes.getPacientesByID);
routerApp.post("/insertPacientes", appLogin.AutenticaJWT, appPacientes.insertPacientes);
routerApp.post("/updatePacientes", appLogin.AutenticaJWT, appPacientes.updatePacientes);
routerApp.post("/DeletePacientes", appLogin.AutenticaJWT, appPacientes.DeletePacientes);

//Rotas de Medicos
routerApp.get("/GetAllMedicos", appLogin.AutenticaJWT, appMedicos.GetAllMedicos);
routerApp.post("/GetMedicosByID", appLogin.AutenticaJWT, appMedicos.GetMedicosByID);
routerApp.post("/InsertMedicos", appLogin.AutenticaJWT, appMedicos.InsertMedicos);
routerApp.post("/UpdateMedicos", appLogin.AutenticaJWT, appMedicos.UpdateMedicos);
routerApp.post("/DeleteMedicos", appLogin.AutenticaJWT, appMedicos.DeleteMedicos);

//Rotas de Consultas
routerApp.get("/getAllConsultas", appLogin.AutenticaJWT, appConsultas.getAllConsultas);
routerApp.post("/getConsultasByID", appLogin.AutenticaJWT, appConsultas.getConsultasByID);
routerApp.post("/insertConsultas", appLogin.AutenticaJWT, appConsultas.insertConsultas);
routerApp.post("/updateConsultas", appLogin.AutenticaJWT, appConsultas.updateConsultas);
routerApp.post("/DeleteConsultas", appLogin.AutenticaJWT, appConsultas.DeleteConsultas);

// Rota Login
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;
