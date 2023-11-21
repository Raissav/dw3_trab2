const axios = require("axios");
const moment = require("moment");

//@ Abre o formulário de manutenção de consultas
const getAllConsultas = (req, res) =>
  (async () => {
    userName = req.session.userName;
    token = req.session.token;
    try {
      resp = await axios.get(process.env.SERVIDOR_DW3 + "/getAllConsultas", {headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },});
      //console.log("[ctlLogin.js] Valor resp:", resp.data);
      res.render("consultas/view_manutencao", {
        title: "Manutenção de consultas",
        data: resp.data,
        userName: userName,
      });
    } catch (erro) {
      console.log("[ctlConsultas.js|getAllConsultas] Try Catch:Erro de requisição");
    }
  })();

//@ Função para validar campos no formulário
function validateForm(regFormPar) {
  //@ *** Regra de validação
  //@ Como todos os campos podem ter valor nulo, vou me preocupar
  //@ com campo datanascimento. Caso ele tenha valor "", vou atribuir null a ele.

  if (regFormPar.datanascimento == "") {
    regFormPar.datanascimento = null;
  }

  return regFormPar;
}

//@ Abre e faz operações de CRUD no formulário de cadastro de consultas
const insertConsultas = (req, res) =>
  (async () => {
    var oper = "";
    var registro = {};
    var medicos = {};
    var pacientes = {};
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method == "GET") {
        oper = "c";
        medicos = await axios.get(
          process.env.SERVIDOR_DW3 + "/getAllConsultas",
          {}
        );
        //console.log("[crlConsultas|insertConsultas] valor de medicos:", medicos.data.registro);
        registro = {
          consultaid: 0,
          codigo: "",
          datacosulta: "",
          medicoid: 0,
          pacienteid: 0,
          deleted: false,
        };

        res.render("consultas/view_cadConsultas", {
          title: "Cadastro de consultas",
          data: registro,
          medico: medicos.data.registro,
          paciente: pacientes.data.registro,
          oper: oper,
          userName: userName,
        });
      } else {
        oper = "c";
        const consultaREG = validateForm(req.body);
        resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/insertConsultas",
          {
            consultaid: 0,
            codigo: consultaREG.codigo,
            datacosulta: consultaREG.datacosulta,
            medicoid: consultaREG.medicoid,
            pacienteid: consultaREG.pacienteid,
            deleted: false,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        console.log("[ctlConsultas|insertConsultas] resp:", resp.data);
        if (resp.data.status == "ok") {
          registro = {
            consultaid: 0,
            codigo: "",
            datacosulta: "",
            medicoid: 0,
            pacienteid: 0,
            deleted: false,
          };
        } else {
          registro = consultaREG;
        }
        medicos = await axios.get(
          process.env.SERVIDOR_DW3 + "/getAllConsultas",
          {}
        );
        oper = "c";
        res.render("consultas/view_cadConsultas", {
          title: "Cadastro de consultas",
          data: registro,
          medico: medicos.data.registro,
          paciente: pacientes.data.registro,
          oper: oper,
          userName: userName,
        });
      }
    } catch (erro) {
      console.log(
        "[ctlConsultas.js|insertConsultas] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

//@ Abre o formulário de cadastro de consultas para futura edição
const viewConsultas = (req, res) =>
  (async () => {
    var oper = "";
    var registro = {};
    var medicos = {};
    var pacientes = {};
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        oper = req.params.oper;

        parseInt(id);
        resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/getConsultaByID",
          {
            consultaid: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          registro = resp.data.registro[0];
          registro.datanascimento = moment(registro.datanascimento).format(
            "YYYY-MM-DD"
          );
          medicos = await axios.get(
            process.env.SERVIDOR_DW3 + "/getAllConsultas",
            {}
          );
          console.log("[ctlConsultas|viewConsultas] GET oper:", oper);

          res.render("consultas/view_cadConsultas", {
            title: "Cadastro de consultas",
            data: registro,
            medico: medicos.data.registro,
            paciente: pacientes.data.registro,
            oper: oper,
            userName: userName,
          });
        }
      } else {
        // Código vai entrar quando o usuário clicar no botão Alterar e requisição for POST
        oper = "vu";
        console.log("[ctlConsultas|viewConsultas] POST oper:", oper);
        const consultaREG = validateForm(req.body);
        console.log("[ctlConsultas|viewConsultas] POST id:", consultaREG.id);
        const id = parseInt(consultaREG.id);
        resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/updateConsultas",
          {
            consultaid: id,
            codigo: consultaREG.codigo,
            datacosulta: consultaREG.datacosulta,
            medicoid: consultaREG.medicoid,
            pacienteid: consultaREG.pacienteid,
            deleted: false,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          res.json({ status: "ok" });
        } else {
          res.json({ status: "erro" });
        }
      }
    } catch (erro) {
      res.json({ status: "[ctlConsultas.js|viewConsultas] Consulta não pode ser alterado" });
      console.log(
        "[ctlConsultas.js|viewConsultas] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

//@ Abre o formulário de cadastro de consultas
const DeleteConsultas = (req, res) =>
  (async () => {
    var oper = "";
    userName = req.session.userName;
    token = req.session.token;
    try {
      oper = "v";
      const id = parseInt(req.body.id);
    
      resp = await axios.post(
        process.env.SERVIDOR_DW3 + "/DeleteConsultas",
        {
          consultaid: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (resp.data.status == "ok") {
        res.json({ status: "ok" });
      } else {
        res.json({ status: "erro" });
      }
    } catch (erro) {
      console.log(
        "[ctlConsultas.js|DeleteConsultas] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

module.exports = {
  getAllConsultas,
  //cadConsultas,
  // getConsultaByID,
  viewConsultas,
  insertConsultas,
  // updateConsultas,
  DeleteConsultas,
};
