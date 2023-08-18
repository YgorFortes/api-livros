import Errobase from "./ErroBase.js";

export default class RequisicaoIncorreta extends Errobase{
  constructor(mensagem = "Um ou mais dados fornecidos estão incorretos"){
    super(mensagem, 400);
      
  }
}