import RequisicaoIncorreta from "./RequisicaoIncorreta.js";


export default class ErroValidacao extends RequisicaoIncorreta{
  
  constructor(erro){
    const mensagemErro = Object.values(erro.errors)
      .map(erro => erro.message)
      .join("; ");

    super( `Os seguintes erros foram encontrados: ${mensagemErro}`);
  }
}