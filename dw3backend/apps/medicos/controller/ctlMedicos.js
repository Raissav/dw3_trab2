const mdlMedicos = require("../model/mdlMedicos");

const GetAllMedicos = (req, res) =>
  (async () => {
    let registro = await mdlMedicos.GetAllMedicos();
    res.json({ status: "ok", registro: registro });
  })();

const GetMedicosByID = (req, res) =>
  (async () => {
    const medicoID = parseInt(req.body.medicoid);
    let registro = await mdlMedicos.GetMedicosByID(medicoID);

    res.json({ status: "ok", registro: registro });
  })();

const InsertMedicos = (request, res) =>
  (async () => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlMedicos.InsertMedicos(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const UpdateMedicos = (request, res) =>
  (async () => {
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlMedicos.UpdateMedicos(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const DeleteMedicos = (request, res) =>
  (async () => {
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlMedicos.DeleteMedicos(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();
module.exports = {
  GetAllMedicos,
  GetMedicosByID,
  InsertMedicos,
  UpdateMedicos,
  DeleteMedicos
};
