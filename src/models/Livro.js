import mongoose from "mongoose";
import autopopulate  from "mongoose-autopopulate";
const livroSchema = new mongoose.Schema(
  {
    id: {
      type: String
    }, 
    titulo:{
      type: String, 
      required: [true, "O titulo do livro é obrigatório"]
    },
    autor: {
      type : mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required : [true, "O autor(a) é obrigatóro"],
      autopopulate: true
    
    }, 
    editora:{
      type : mongoose.Schema.Types.ObjectId, 
      ref: "editoras", 
      required : [true, "A editora é obrigatório"],
      autopopulate: true
    
    },
    numeroPaginas: {
      type: Number, 
      min: [10,"O numero número de páginas deve ser maior que 10 e menor que 5000"], 
      max: [5000,"O numero de páginas deve ser maior que 10 e menor que 5000"]
    },
    genero:{
      type: String, 
      // required: [true, "O genêro do livro é obrigatorio"],
      enum: {
        values:  ["Fantasia", "Terror", "Infanto juvenil", "Policial", "Romântico", "Ficção científica", "Suspense", "Outros"],
        // eslint-disable-next-line no-undef
        message: "O genero {VALUE} não foi indentificado como válido"
      }
    }
  }
);

livroSchema.plugin(autopopulate); //Colocando o Populate automaticamente, graças ao plugin autoPopulate
const livros = mongoose.model("livros",livroSchema);

export default livros;