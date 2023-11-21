const axios = require("axios");

//@ Abre o formulário de manutenção de medicos
const getAllMedicos = (req, res) =>
  (async () => {
    userName = req.session.userName;
    token = req.session.token;
    try {
      resp = await axios.get(process.env.SERVIDOR_DW3 + "/GetAllMedicos", {headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },});
      //console.log("[ctlLogin.js] Valor resp:", resp.data);
      res.render("medicos/view_manutencao", {
        title: "Manutenção de medicos",
        data: resp.data,
        userName: userName,
      });
    } catch (erro) {
      console.log("[ctlMedicos.js|getAllMedicos] Try Catch:Erro de requisição");
    }
  })();

//@ Abre formulário de cadastro de medicos
const openMedicosInsert = (req, res) =>
  (async () => {
    var oper = "";
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method == "GET") {
        oper = "c";
        res.render("medicos/view_cadMedicos", {
          title: "Cadastro de medicos",
          oper: oper,
          userName: userName,
        });
      }
    } catch (erro) {
      console.log(
        "[ctlMedicos.js|insertMedicos] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

//@ Função para validar campos no formulário
function validateForm(regFormPar) {
  if (regFormPar.medicoid == "") {
    regFormPar.medicoid = 0;
  } else {
    regFormPar.medicoid = parseInt(regFormPar.medicoid);
  }

  regFormPar.ativo = regFormPar.ativo === "true"; //converte para true ou false um check componet
  regFormPar.deleted = regFormPar.deleted === "true"; //converte para true ou false um check componet

  return regFormPar;
}

//@ Abre formulário de cadastro de medicos
const openMedicosUpdate = (req, res) =>
  (async () => {
    var oper = "";
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method == "GET") {
        oper = "u";
        const id = req.params.id;
        parseInt(id);
        res.render("medicos/view_cadMedicos", {
          title: "Cadastro de medicos",
          oper: oper,
          idBusca: id,
          userName: userName,
        });
      }
    } catch (erro) {
      console.log(
        "[ctlMedicos.js|insertMedicos] Try Catch: Erro não identificado",
        erro
      );
    }
  })();


//@ Recupera os dados dos medicos
const getDados = (req, res) =>
  (async () => {
    const idBusca = req.body.idBusca;    
    parseInt(idBusca);
    console.log("[ctlMedicos.js|getDados] valor id :", idBusca);
    try {
      resp = await axios.post(
        process.env.SERVIDOR_DW3 + "/GetMedicosByID",
        {
          medicoid: idBusca,
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
        "[ctlMedicos.js|getDados] Try Catch: Erro não identificado",
        erro
      );
    }
    
  })();

//@ Realiza inserção de medicos
const insertMedicos = (req, res) =>
  (async () => {
    token = req.session.token;
    try {
      if (req.method == "POST") {
        const regPost = validateForm(req.body);
        regPost.medicoid = 0;
        const resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/InsertMedicos",
          regPost,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          res.json({ status: "ok", mensagem: "Medico inserido com sucesso!" });
        } else {
          res.json({ status: "erro", mensagem: "Erro ao inserir medico!" });
        }
      }
    } catch (erro) {
      console.log(
        "[ctlMedicos.js|insertMedicos] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

 
  
//@ Realiza atualização de medicos
///@ console.log("[ctlMedicos.js|updateMedicos] Valor regPost: ", regPost);
const updateMedicos = (req, res) =>
  (async () => {
    token = req.session.token;
    try {
      if (req.method == "POST") {
        const regPost = validateForm(req.body);
        const resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/UpdateMedicos",
          regPost,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          res.json({ status: "ok", mensagem: "Medico atualizado com sucesso!" });
        } else {
          res.json({ status: "erro", mensagem: "Erro ao atualizar medico!" });
        }
      }
    } catch (erro) {
      console.log(
        "[ctlMedicos.js|updateMedicos] Try Catch: Erro não identificado.",
        erro
      );
    }
  })();

//@ Realiza remoção soft de medicos
//@ "[ctlMedicos.js|deleteMedicos] Try Catch: Erro não identificado", erro);
const deleteMedicos = (req, res) =>
(async () => {
  token = req.session.token;
  try {
    if (req.method == "POST") {
      const regPost = validateForm(req.body);
      regPost.medicoid = parseInt(regPost.medicoid);
      const resp = await axios.post(
        process.env.SERVIDOR_DW3 + "/DeleteMedicos",
        {
          medicoid: regPost.medicoid,
        },        
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (resp.data.status == "ok") {
        res.json({ status: "ok", mensagem: "Medico removido com sucesso!" });
      } else {
        res.json({ status: "erro", mensagem: "Erro ao remover medico!" });
      }
    }
  } catch (erro) {
    console.log(
      "[ctlMedicos.js|deleteMedicos] Try Catch: Erro não identificado", erro);
  }
})();
module.exports = {
  getAllMedicos,
  openMedicosInsert,
  openMedicosUpdate,
  getDados,
  insertMedicos,
  updateMedicos,
  deleteMedicos,
};
