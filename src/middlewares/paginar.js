import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
export default async function paginar(req, res, next){ //Midleware sempre recebe esses parametros
  try{
    let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;
    let [campoOrdenacao, ordem] = ordenacao.split(":");
    
    limite = parseInt(limite);
    pagina = parseInt(pagina);
 
    
    const resultado = req.resultado;
    
    if(limite > 0 && pagina > 0){
      const resultadoPaginado = await resultado.find()
        .sort({[campoOrdenacao]: ordem})
        .skip( (pagina -1) * limite)
        .limit(limite);
      res.status(200).json(resultadoPaginado);  
    }else {
      next(new RequisicaoIncorreta());
    } 
  }catch(erro){
    console.log(erro);
  }
}