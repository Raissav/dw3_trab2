const mdlConsultas = require("../model/mdlConsultas");

const getAllConsultas = (req, res) =>
  (async () => {
    let registro = await mdlConsultas.getAllConsultas();
    res.json({ status: "ok", "registro": registro });
  })();

const getConsultasByID = (req, res) =>
  (async () => {
    const consultaID = parseInt(req.body.consultaid);
    let registro = await mdlConsultas.getConsultasByID(consultaID);

    res.json({ status: "ok", "registro": registro });
  })();

const insertConsultas = (request, res) =>
  (async () => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
    const consultaREG = request.body;    
    let { msg, linhasAfetadas } = await mdlConsultas.insertConsultas(consultaREG);    
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const updateConsultas = (request, res) =>
  (async () => {
    const consultaREG = request.body;
    let  { msg, linhasAfetadas } = await mdlConsultas.UpdateConsultas(consultaREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

  const DeleteConsultas = (request, res) =>
  (async () => {
    const consultaREG = request.body;
    let { msg, linhasAfetadas } = await mdlConsultas.DeleteConsultas(consultaREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {
  getAllConsultas,
  getConsultasByID,
  insertConsultas,
  updateConsultas,
  DeleteConsultas
};