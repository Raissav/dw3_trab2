const db = require("../../../database/databaseconfig");

const GetAllMedicos = async () => {
  return (
    await db.query(
      "SELECT * " + "FROM medicos where deleted = false ORDER BY descricao ASC"
    )
  ).rows;
};

const GetMedicosByID = async (medicoIDPar) => {
  return (
    await db.query(
      "SELECT * " +
        "FROM medico WHERE medicoid = $1 and deleted = false ORDER BY descricao ASC",
      [medicoIDPar]
    )
  ).rows;
};

const InsertMedicos = async (registroPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO medicos " + "values(default, $1, $2, $3, $4)",
        [
          registroPar.crm,
          registroPar.nome,
          registroPar.especializacao,
          registroPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlMedicos|insertMedicos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdateMedicos = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE medicos SET " +
          "codigo = $2, " +
          "descricao = $3, " +
          "ativo = $4, " +
          "deleted = $5 " +          
          "WHERE medicoid = $1",
        [
            registroPar.medicoid  ,
            registroPar.crm   ,
            registroPar.nome,
            registroPar.especializacao,
            registroPar.deleted,          
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlMedicos|UpdateMedicos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};


const DeleteMedicos = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    linhasAfetadas = (
    await db.query(
      "UPDATE medicos SET " + "deleted = true " + "WHERE medicoid = $1",
      [registroPar.medicoid]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlMedicos|DeleteMedicos] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};


module.exports = {
  GetAllMedicos,
  GetMedicosByID,
  InsertMedicos,
  UpdateMedicos,
  DeleteMedicos,
};
