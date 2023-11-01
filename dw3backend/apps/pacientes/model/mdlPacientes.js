const db = require("../../../database/databaseconfig");

const getAllPacientes = async () => {
  return (
    await db.query(
      "SELECT * " +
        "FROM pacientes WHERE deleted = false ORDER BY nome ASC",
      [pacienteIDPar]
    )
  ).rows;
};

const getPacientesByID = async (pacienteIDPar) => {
  return (
    await db.query(
      "SELECT * " +
        "FROM pacientes WHERE pacienteid = $1 and deleted = false ORDER BY nome ASC",
      [pacienteIDPar]
    )
  ).rows;
};

const insertPacientes = async (pacienteREGPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO pacientes " + "values(default, $1, $2, $3, $4, $5)",
        [
          pacienteREGPar.cpf,
          pacienteREGPar.nome,
          pacienteREGPar.endereco,
          pacienteREGPar.datanascimento,
          pacienteREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlPacientes|insertPacientes] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdatePacientes = async (pacienteREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE pacientes SET " +
          "cpf = $2, " +
          "nome = $3, " +
          "endereco = $4, " +
          "datanascimento = $5, " +
          "deleted = $6" +
          "WHERE pacienteid = $1",
        [
          pacienteREGPar.pacienteid,
          pacienteREGPar.nome,
          pacienteREGPar.endereco,
          pacienteREGPar.datanascimento,
          pacienteREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlAlunos|insertAlunos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const DeletePacientes = async (pacienteREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    linhasAfetadas = (
    await db.query(
      "UPDATE pacientes SET " + "deleted = true " + "WHERE pacienteid = $1",
      [pacienteREGPar.pacinteid]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlPacientes|insertPacientes] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};

module.exports = {
  getAllPacientes,
  getPacientesByID,
  insertPacientes,
  UpdatePacientes,
  DeletePacientes,
};
