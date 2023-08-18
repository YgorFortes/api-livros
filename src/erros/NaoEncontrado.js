import Errobase from "./ErroBase.js";

export default class NaoEncontrado extends Errobase{
  constructor(mensagem = "Página não encontrada"){
    super(mensagem ,404);
  }
}