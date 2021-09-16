import { IErro } from "./interfaces";
export default class Erro implements IErro {
  model?: string;
  campo?: string;
  mensagem?: string;
}
