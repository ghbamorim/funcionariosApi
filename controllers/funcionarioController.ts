import db from "../db/db";
import { IFuncionario } from "../models/interfaces";

export default class FuncionarioController {
  new = (funcionario: IFuncionario) => {
    db.insert(funcionario);
    db.commit();
    return funcionario;
  };

  delete = (id: number) => {
    db.delete(id);
    db.commit();
  };

  update = (funcionario: IFuncionario) => {
    db.update(funcionario);
    db.commit();
    return funcionario;
  };

  findById = (id: number): IFuncionario | undefined => db.findById(id);
  findByName = (nome: string): IFuncionario | undefined => db.findByName(nome);
  list = (): IFuncionario[] | undefined => db.findAll();
}
