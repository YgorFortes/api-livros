import AutorController from "../controllers/autoresController.js";
import paginar from "../middlewares/paginar.js";
import express from "express";

const router = express.Router();

router
  .get("/autores", AutorController.listarAutores, paginar)
  .get("/autores/busca", AutorController.listarPorFiltro, paginar)
  .get("/autores/:id", AutorController.listarAutorPorId)
  .post("/autores", AutorController.cadastrarAutor)
  .put("/autores/:id", AutorController.atualizarAutor)
  .delete("/autores/:id", AutorController.deletarAutor);



export default router;