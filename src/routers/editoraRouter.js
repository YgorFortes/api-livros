import EditoraController from "../controllers/editorasController.js";
import paginar from "../middlewares/paginar.js";
import express from "express";

const router = express.Router();

router
  .get("/editoras", EditoraController.listarEditoras, paginar)
  .get("/editoras/busca",EditoraController.listarEditorasPorFiltro, paginar)
  .get("/editoras/:id", EditoraController.listarEditoraPorId)
  .post("/editoras", EditoraController.cadastrarEditora)
  .put("/editoras/:id", EditoraController.atualizarEditora)
  .delete("/editoras/:id", EditoraController.deletarEditora);

export default router;