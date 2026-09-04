import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import app from "./app.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
  path: path.resolve(__dirname, "../../../.env"),
});
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Build Me API running on port ${port}`);
});
