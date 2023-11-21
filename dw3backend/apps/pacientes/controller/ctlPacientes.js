const mdlPacientes = require("../model/mdlPacientes");

const getAllPacientes = (req, res) =>
  (async () => {
    let registro = await mdlPacientes.getAllPacientes();
    res.json({ status: "ok", "registro": registro });
  })();

const getPacientesByID = (req, res) =>
  (async () => {
    const pacienteID = parseInt(req.body.pacienteid);
    let registro = await mdlPacientes.getPacientesByID(pacienteID);

    res.json({ status: "ok", "registro": registro });
  })();

const insertPacientes = (request, res) =>
  (async () => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
    const pacienteREG = request.body;    
    let { msg, linhasAfetadas } = await mdlPacientes.insertPacientes(pacienteREG);    
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const updatePacientes = (request, res) =>
  (async () => {
    const pacienteREG = request.body;
    let  { msg, linhasAfetadas } = await mdlPacientes.UpdatePacientes(pacienteREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

  const DeletePacientes = (request, res) =>
  (async () => {
    const pacienteREG = request.body;
    let { msg, linhasAfetadas } = await mdlPacientes.DeletePacientes(pacienteREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {
  getAllPacientes,
  getPacientesByID,
  insertPacientes,
  updatePacientes,
  DeletePacientes
};
