import NaoEncontrado from "../erros/NaoEncontrado.js";
import {editoras} from "../models/index.js";

export default class Editora {

  //Lista todas ad editoras cadastradas
  static listarEditoras =  async(req, res, next)=> {
    try{
      const resultadoEditora =  editoras.find();
      
      req.resultado = resultadoEditora;
      next();
    }catch (erro){
      next(erro);
    }
  };

  //Listar editoras por determinado filtro
  static listarEditorasPorFiltro = async(req, res, next)=>{
    let busca = await processaBusca(req.query);
    try{
      if(busca !== null){
        const resultadoBuscaPorFiltro =  editoras.find(busca);

        res.resultado = resultadoBuscaPorFiltro;
        next();
      }else{
        next(new NaoEncontrado("Não encontrado, por favor coloque um campo válido"));
      }
    }catch(erro){
      console.log(erro);
    }
  };


  //Lista editora pelo id 
  static listarEditoraPorId = async (req, res, next) => {
    try{
      const id = req.params.id;
      const resultadoEditoraPorId = await editoras.findById(id);
      if(resultadoEditoraPorId === null){
        next(new NaoEncontrado("Id da editora não encontrado"));
      }else {
        res.status(200).json(resultadoEditoraPorId);
      }
    }catch (erro){
      next(erro);
    }
  };

  //Cadastra editora
  static cadastrarEditora = async (req, res, next)=> {
    try {
      const editora = new editoras(req.body);
      await editora.validate();
      editora.save();
      res.status(201).send(editora.toJSON());
    }catch(erro){
      next(erro);
    }
  };

  //Atualiza editora por id
  static atualizarEditora = async (req, res, next)=>{
    try{
      const id = req.params.id;
      const resultadoAtualizarEditora = await editoras.findByIdAndUpdate(id, {$set: req.body});
      if(resultadoAtualizarEditora === null){
        next(new NaoEncontrado("Id da editora não encontrado, digite uma id válida para atualizar"));
      }else {
        res.status(201).send("Editora atualizada com sucesso");
      }
    }catch(erro){
      next(erro);
    }
  };

  //Deleta editora por id
  static deletarEditora = async (req, res, next)=> {
    try {
      const id = req.params.id;
      const resultadoDeletaEditora = await editoras.findByIdAndDelete(id);
      if(resultadoDeletaEditora === null){
        next(new NaoEncontrado("Id da editora não encontrado, digite uma id válida para deletar"));
      }else {
        res.status(201).send("Editora deletada com sucesso");
      }
    }catch(erro){
      next(erro);
    }
  };
}

// processo qual vai ser o req.querry e manda para listarPorFiltros
async function processaBusca(parametros){
  let busca = {};
  const {nomeEditora} = parametros;

  //Filtrando nome de autor, por autores
  if(nomeEditora)  busca.nome = {$regex:  nomeEditora, $options : "i"} ;

  return busca;
}