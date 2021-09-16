import { IFuncionario } from "./interfaces";

export default class Funcionario implements IFuncionario {
  id?: number;
  nome?: string;
  cargo?: string;
}
