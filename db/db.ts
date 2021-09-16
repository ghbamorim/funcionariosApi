import { IFuncionario } from "../models/interfaces";
import { jdb } from "./jsondb";

/*melhor separar Db de jdb, caso precise mudar o ORM */
class Db {
  private seq_funcionario: number = jdb.getObject<number>("/seq_funcionario");
  private funcionarios: IFuncionario[] =
    jdb.getObject<IFuncionario[]>("/funcionarios");
  insert = (funcionario: IFuncionario) => {
    funcionario.id = ++this.seq_funcionario;
    this.funcionarios.push(funcionario);
    jdb.push("/seq_funcionario", this.seq_funcionario);
  };
  delete = (id: number) => {
    const found = this.findById(id);
    if (found) {
      const index = this.funcionarios.indexOf(found);

      this.funcionarios = this.funcionarios.filter(function (value, i, arr) {
        return i !== index;
      });
    }
  };
  update = (funcionario: IFuncionario) => {
    const found = funcionario.id && this.findById(funcionario.id);
    if (found) {
      found.nome = funcionario.nome;
      found.cargo = funcionario.cargo;
    }
  };
  commit = () => {
    jdb.push("/funcionarios", this.funcionarios);
  };
  findById = (id: number) => {
    return this.funcionarios.find((element) => element.id == id);
  };
  findByName = (nome: string) => {
    return this.funcionarios.find((element) => element?.nome === nome);
  };
  findAll = () => {
    return this.funcionarios;
  };
}

const db = new Db();

export default db;
