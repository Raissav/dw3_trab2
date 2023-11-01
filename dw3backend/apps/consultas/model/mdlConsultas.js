const db = require("../../../database/databaseconfig");

const getAllConsultas = async () => {
  return (
    await db.query(
      "SELECT m.nome AS nome_medico, p.nome AS nome_paciente, dataconsulta" +
      "FROM consultas c" +
      "JOIN medicos m ON m.medicoid = c.medicoid" +
      "JOIN pacientes p ON p.pacienteid = c.pacienteid" +
      "WHERE c.deleted = false" +
      "ORDER BY nome_medico ASC;"
    )
  ).rows;
};

const getConsultasByID = async (consultaIDPar) => {
  return (
    await db.query(
      "SELECT m.nome AS nome_medico, p.nome AS nome_paciente, dataconsulta" +
      "FROM consultas c" +
      "JOIN medicos m ON m.medicoid = c.medicoid" +
      "JOIN pacientes p ON p.pacienteid = c.pacienteid" +
      "WHERE c.deleted = false" +
      "ORDER BY nome_medico ASC;"
      [consultaIDPar]
    )
  ).rows;
};

const insertConsultas = async (consultaREGPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO consulta " + "values(default, $1, $2, $3, $4, $5)",
        [
          consultaREGPar.codigo,
          consultaREGPar.dataconsulta,
          consultaREGPar.medicoid,
          consultaREGPar.pacienteid,
          consultaREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlConsultas|insertConsultas] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdateConsultas = async (consultaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE consultas SET " +
          "codigo = $2, " +
          "dataconsulta = $3, " +
          "medicoid = $4, " +
          "pacienteid = $5, " +
          "deleted = $6 " +
          "WHERE consultaid = $1",
        [
          consultaREGPar.consultaid,
          consultaREGPar.codigo,
          consultaREGPar.dataconsulta,
          consultaREGPar.medicoid,
          consultaREGPar.pacienteid,
          consultaREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlConsultas|insertConsultas] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const DeleteConsultas = async (consultaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    linhasAfetadas = (
    await db.query(
      "UPDATE consultas SET " + "deleted = true " + "WHERE consultaid = $1",
      [consultaREGPar.consultaid]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlConsultas|insertConsultas] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};

module.exports = {
  getAllConsultas,
  getConsultasByID,
  insertConsultas,
  UpdateConsultas,
  DeleteConsultas,
};