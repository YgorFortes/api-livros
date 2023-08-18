import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autores} from "../models/index.js";
import {editoras} from "../models/index.js";
import {livros} from "../models/index.js";


export default class LivroController {

  //Lista todos os livros cadastrados
  static listarLivros = async (req, res, next) =>{
    try{
      const buscarLivros = livros.find();
      req.resultado = buscarLivros;
      next();
    }catch(erro){
      next(erro);
    }
  };

  //Lista livros por determinados filtros
  static listarLivrosPorFiltro = async (req, res, next)=>{
    try{
      let busca = await  processaBusca(req.query);
  
      if(busca !== null){
        const resultadoBusca =  livros.find(busca);
        req.resultado = resultadoBusca;
        next();
      } else {
        next( new NaoEncontrado("Não encontrado, por favor coloque um campo válido"));
      }
    }catch(erro){
      next(erro);
    }
  };


  //Lista livro pelo id 
  static listarLivrosPorId = async (req, res, next)=> {
    try{
      const id = req.params.id;
      const livrosResultadoPorId = await livros.findById(id);
      if(livrosResultadoPorId === null){
        next(new NaoEncontrado("Id de livro não encontrado"));
      }else {
        res.status(200).json(livrosResultadoPorId);
      }
    }catch(erro){
      next(erro);
    }
  };

  //Cadastra livro
  static cadastrarLivro = async (req, res, next) =>{
    try{
      let livro = new livros(req.body);
      await livro.validate();
      livro.save();
      res.status(201).send(livro.toJSON());
    }catch(erro){
      next(erro);
    }
  };

  //Atualiza o livro pelo id 
  static atualizarLivro = async (req, res, next)=> {
    try{
      const id = req.params.id;
      const resultadoAtualizarLivro = await livros.findByIdAndUpdate(id,{$set: req.body});
      if(resultadoAtualizarLivro === null){
        next(new NaoEncontrado("Id não encontrado, coloque um id valido para atualizar"));
      } else {
        res.status(200).send("Livro atualizado com sucesso");
      }
     
    }catch(erro){
      next(erro);
    }
  };

  //Deleta o livro pelo id
  static deletarLivro = async (req, res, next)=>{
    try{
      const id = req.params.id;
      const resultadoDeletaLivro = await livros.findByIdAndRemove(id);
      if(resultadoDeletaLivro === null){
        next(new NaoEncontrado("Id não encontrado, coloque um id valido para deletar"));
      } else {
        res.status(200).send("Livro deletado com sucesso");
      }
    }catch(erro){
      next(erro);
    }
  };

}

// processo qual vai ser o req.querry e manda para listarPorFiltros
async function processaBusca(parametros){
  let  busca = {};
  const  {titulo, genero, minPaginas, maxPaginas, nomeAutor, nomeEditora, autorNacionalidade} =  parametros;

  //Filtrando pelo titulo do livro
  if(titulo) busca.titulo = {$regex:  titulo, $options : "i"};

  //Filtrando por genero literário
  if(genero) busca.genero = {$regex:  genero, $options : "i"};
   
  //Filtrando pela quantidade minima é máxima de páginas
  if(minPaginas  || maxPaginas) busca.numeroPaginas =  {};

  //Filtrando por quantidade mínima de páginas
  if(minPaginas) busca.numeroPaginas.$gte = minPaginas; 

  //Filtrando por quantidade maxima de páginas
  if(maxPaginas) busca.numeroPaginas.$lte = maxPaginas; 

  //Filtrando por nome de autor
  if(nomeAutor) {
    const regexAutor = {$regex:  nomeAutor, $options : "i"}; 
    const autor = await autores.findOne({nome: regexAutor});
    if(autor !== null){
      const autorId = autor._id;
      busca.autor = autorId;
    } else {
      busca = null;
    } 
  }

  //Filtrando por nome da editora
  if(nomeEditora) {
    const regexEditora = {$regex: nomeEditora, $options: "i"};
    const editora = await editoras.findOne({nome: regexEditora});
    if(editora !== null){
      const editoraId = editora._id;
      busca.editora =  editoraId;
    }else {
      busca = null;
    }
  }


  //Filtrando por nacionalidade do autor
  if(autorNacionalidade){
    const regexNascionalidade = {$regex: autorNacionalidade, $options: "i"};
    const resultadoNacionalidadeDeAutores = await autores.find({nacionalidade: regexNascionalidade}); 
    if(resultadoNacionalidadeDeAutores.length > 0){          
      resultadoNacionalidadeDeAutores.forEach((nacionalidadeAutor) =>{
        const idNacionalidadeAutor = nacionalidadeAutor._id;
        return busca.autor = idNacionalidadeAutor;
      }); 
    }else {
      busca = null;
    }
  }
  return busca;

}