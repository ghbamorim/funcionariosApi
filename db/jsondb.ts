/*Preferia usar Sequelize, mas ia levar mais tempo para configurar */
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import Funcionario from "../models/funcionario";
import { IFuncionario } from "../models/interfaces";

export const jdb = new JsonDB(new Config("funcdatabase", true, false, "/"));
const funcionarios = jdb.getObject<IFuncionario[]>("/");

if (!("funcionarios" in funcionarios)) {
  const func = new Funcionario();
  func.id = 1;
  func.nome = "Gustavo Amorim";
  func.cargo = "Desenvolvedor";

  jdb.push("/seq_funcionario", 1);
  jdb.push("/funcionarios", [func]);
}
