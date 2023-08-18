/* eslint-disable no-undef */
import app from "./src/app.js";
import "dotenv/config";

const port = process.env.PORT || 3000;
app.listen(port, () =>{
  console.log(`Seu serve está funcionando na porta: http://localhost:${port}`);
});