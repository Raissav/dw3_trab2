const axios = require("axios");

//@ Abre o formulário de manutenção de pacientes
const getAllPacientes = (req, res) =>
  (async () => {
    userName = req.session.userName;
    token = req.session.token;
    try {
      resp = await axios.get(process.env.SERVIDOR_DW3 + "/GetAllPacientes", {headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },});
      //console.log("[ctlLogin.js] Valor resp:", resp.data);
      res.render("pacientes/view_manutencao", {
        title: "Manutenção de pacientes",
        data: resp.data,
        userName: userName,
      });
    } catch (erro) {
      console.log("[ctlPacientes.js|getAllPacientes] Try Catch:Erro de requisição");
    }
  })();

//@ Abre formulário de cadastro de pacientes
const openPacientesInsert = (req, res) =>
  (async () => {
    var oper = "";
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method == "GET") {
        oper = "c";
        res.render("pacientes/view_cadPacientes", {
          title: "Cadastro de pacientes",
          oper: oper,
          userName: userName,
        });
      }
    } catch (erro) {
      console.log(
        "[ctlPacientes.js|insertPacientes] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

//@ Função para validar campos no formulário
function validateForm(regFormPar) {
  if (regFormPar.pacienteid == "") {
    regFormPar.pacienteid = 0;
  } else {
    regFormPar.pacienteid = parseInt(regFormPar.pacienteid);
  }

  regFormPar.ativo = regFormPar.ativo === "true"; //converte para true ou false um check componet
  regFormPar.deleted = regFormPar.deleted === "true"; //converte para true ou false um check componet

  return regFormPar;
}

//@ Abre formulário de cadastro de pacientes
const openPacientesUpdate = (req, res) =>
  (async () => {
    var oper = "";
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method == "GET") {
        oper = "u";
        const id = req.params.id;
        parseInt(id);
        res.render("pacientes/view_cadPacientes", {
          title: "Cadastro de pacientes",
          oper: oper,
          idBusca: id,
          userName: userName,
        });
      }
    } catch (erro) {
      console.log(
        "[ctlPacientes.js|insertPacientes] Try Catch: Erro não identificado",
        erro
      );
    }
  })();


//@ Recupera os dados dos pacientes
const getDados = (req, res) =>
  (async () => {
    const idBusca = req.body.idBusca;    
    parseInt(idBusca);
    console.log("[ctlPacientes.js|getDados] valor id :", idBusca);
    try {
      resp = await axios.post(
        process.env.SERVIDOR_DW3 + "/GetPacientesByID",
        {
          pacienteid: idBusca,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (resp.data.status == "ok") {
        res.json({ status: "ok", registro: resp.data.registro[0] });
      }
    } catch (error) { 
      console.log(
        "[ctlPacientes.js|getDados] Try Catch: Erro não identificado",
        erro
      );
    }
    
  })();

//@ Realiza inserção de pacientes
const insertPacientes = (req, res) =>
  (async () => {
    token = req.session.token;
    try {
      if (req.method == "POST") {
        const regPost = validateForm(req.body);
        regPost.pacienteid = 0;
        const resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/InsertPacientes",
          regPost,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          res.json({ status: "ok", mensagem: "Paciente inserido com sucesso!" });
        } else {
          res.json({ status: "erro", mensagem: "Erro ao inserir paciente!" });
        }
      }
    } catch (erro) {
      console.log(
        "[ctlPacientes.js|insertPacientes] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

 
  
//@ Realiza atualização de pacientes
///@ console.log("[ctlPacientes.js|updatePacientes] Valor regPost: ", regPost);
const updatePacientes = (req, res) =>
  (async () => {
    token = req.session.token;
    try {
      if (req.method == "POST") {
        const regPost = validateForm(req.body);
        const resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/UpdatePacientes",
          regPost,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          res.json({ status: "ok", mensagem: "Paciente atualizado com sucesso!" });
        } else {
          res.json({ status: "erro", mensagem: "Erro ao atualizar paciente!" });
        }
      }
    } catch (erro) {
      console.log(
        "[ctlPacientes.js|updatePacientes] Try Catch: Erro não identificado.",
        erro
      );
    }
  })();

//@ Realiza remoção soft de pacientes
//@ "[ctlPacientes.js|deletePacientes] Try Catch: Erro não identificado", erro);
const deletePacientes = (req, res) =>
(async () => {
  token = req.session.token;
  try {
    if (req.method == "POST") {
      const regPost = validateForm(req.body);
      regPost.pacienteid = parseInt(regPost.pacienteid);
      const resp = await axios.post(
        process.env.SERVIDOR_DW3 + "/DeletePacientes",
        {
          pacienteid: regPost.pacienteid,
        },        
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (resp.data.status == "ok") {
        res.json({ status: "ok", mensagem: "Paciente removido com sucesso!" });
      } else {
        res.json({ status: "erro", mensagem: "Erro ao remover paciente!" });
      }
    }
  } catch (erro) {
    console.log(
      "[ctlPacientes.js|deletePacientes] Try Catch: Erro não identificado", erro);
  }
})();
module.exports = {
  getAllPacientes,
  openPacientesInsert,
  openPacientesUpdate,
  getDados,
  insertPacientes,
  updatePacientes,
  deletePacientes,
};
