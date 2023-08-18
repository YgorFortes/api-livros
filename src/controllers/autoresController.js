import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autores} from "../models/index.js";

export default class AutorController {
  static listarAutores = async (req, res, next) =>{
    try {
      const resultadoBuscaAutores =  autores.find();
      
      req.resultado = resultadoBuscaAutores;
      next();
    }catch(erro){
      next(erro);
    }
  };

  //Lista livros por determinados filtros
  static listarPorFiltro = async(req, res, next) => {
    let busca = await processaBusca(req.query);
    console.log(busca);
    try {
      if(busca !== null){
        const resultadoBusca=  autores.find(busca);
        req.resultado = resultadoBusca;
        next();
      }else {
        next(new NaoEncontrado("Não encontrado, por favor coloque um campo válido"));
      }
    }catch(erro){
      next(erro);
    }
  };

  //Listar autor por id
  static listarAutorPorId = async (req, res, next) =>{
    try{
      const id = req.params.id;
      const resultadoAutorPorId = await autores.findById(id);
      if(resultadoAutorPorId  === null){
        next(new NaoEncontrado("Id de autor não encontrado"));
      }else {
        res.status(200).send(resultadoAutorPorId);
      }
    }catch(erro){
      next(erro);
    }
  };

  //Cadastra autor
  static cadastrarAutor = async (req, res, next) => {
    try {
      const autor =  new autores(req.body);
      await autor.validate();
      autor.save();
      res.status(201).send(autor.toJSON());
    }catch(erro){
      next(erro);
    }
  };

  //Atualiza autor pelo id
  static atualizarAutor = async (req, res, next)=> {
    try {
      const id = req.params.id;
      const resultadoAtualizarAutor = await  autores.findByIdAndUpdate(id, {$set: req.body});
      if(resultadoAtualizarAutor === null){
        next(new NaoEncontrado("Id do autor não encontrado, digite uma id válida para atualizar"));
      }else {
        res.status(200).send("Autor atualizado com sucesso");
      }     
    }catch(erro){
      next(erro);

    }
  };

  //Deleta o autor pelo id
  static deletarAutor = async(req, res, next)=>{
    try{
      const id = req.params.id;
      const resultadoDeletarAutor = await autores.findByIdAndDelete(id);
      if(resultadoDeletarAutor === null){
        next(new NaoEncontrado("Id do autor não encontrado, digite uma id válida para deletar"));
      }else {
        res.status(200).send("Autor excluido com sucesso");
      }
    }catch(erro){
      next(erro);
    }
  };
  
}

// processo qual vai ser o req.querry e manda para listarPorFiltros
async function processaBusca(parametros){

  let busca = {};
  const {nomeAutor, autorNacionalidade} = parametros;


  //Filtrando nome de autor, por autores
  if(nomeAutor)  busca.nome = {$regex:  nomeAutor, $options : "i"};

  //Filtrando nacionalidade de autor por autores
  if (autorNacionalidade) busca.nacionalidade = {$regex:  autorNacionalidade, $options : "i"}  ;

  return busca;
}