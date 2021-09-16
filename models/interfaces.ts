export interface IFuncionario {
  id?: number;
  nome?: string;
  cargo?: string;
}

export interface IErro {
  model?: string;
  campo?: string;
  mensagem?: string;
}
