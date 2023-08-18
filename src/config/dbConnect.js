import mongoose from "mongoose";
import "dotenv/config";

//Conectando
// eslint-disable-next-line no-undef
mongoose.connect(process.env.STRING_CONEXAO_DB);

//varivel com a conexão
let db = mongoose.connection;

//Exportando a conexão
export default db;