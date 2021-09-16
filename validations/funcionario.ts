import { IFuncionario } from "../models/interfaces";
import { IErro } from "../models/interfaces";
import FuncionarioController from "../controllers/funcionarioController";

export default class ValidaFuncionario {
  funcController: FuncionarioController | undefined = undefined;
  validaInsert = (funcionario: IFuncionario, erros: IErro[]) => {
    let result = true;

    if (!funcionario.nome) {
      erros.push({
        model: "Funcionario",
        campo: "nome",
        mensagem: "Nome não informado",
      } as IErro);
      result = false;
    }

    if (!funcionario.cargo) {
      erros.push({
        model: "Funcionario",
        campo: "cargo",
        mensagem: "Cargo não informado",
      } as IErro);
      result = false;
    }

    if (funcionario.nome) {
      const found =
        this.funcController && this.funcController.findByName(funcionario.nome);
      if (found?.cargo === funcionario.cargo) {
        erros.push({
          model: "Funcionario",
          campo: "",
          mensagem: "Já existe um funcionário com esse nome e cargo",
        } as IErro);
        result = false;
      }
    }
    return result;
  };

  funcionarioExiste = (id: number, erros: IErro[]) => {
    let result = true;

    const found = this.funcController && this.funcController.findById(id);
    if (!found) {
      erros.push({
        model: "Funcionario",
        campo: "",
        mensagem: "Funcionário não encontrado",
      } as IErro);
      result = false;
    }
    return result;
  };

  validaUpdate = (funcionario: IFuncionario, erros: IErro[]) => {
    let result =
      funcionario.id && this.funcionarioExiste(funcionario.id, erros);
    if (!result) {
      return result;
    }
    return this.validaInsert(funcionario, erros);
  };

  constructor(controller: FuncionarioController) {
    this.funcController = controller;
  }
}
