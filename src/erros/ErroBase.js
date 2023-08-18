class Errobase extends Error{
  constructor(mensagem = "Erro interno do servidor", status = 500){
    super();
    this.mensagem = mensagem;
    this.status = status;
  }

  enviarRespostas(res) {
    res.status(this.status).send({
      mensagem: this.mensagem,
      status: this.status
    });
  }
  
  
}

export default Errobase;

