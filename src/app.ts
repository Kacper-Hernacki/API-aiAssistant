import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { init as initDb } from "./config/db";
import messageRoutes from "./routes/messageRoutes";
import resourceRoutes from "./routes/resourceRoutes";
import skillRoutes from "./routes/skillRoutes";
import apiKeyAuth from "./middleware/apiKeyAuth";
import filesRoutes from "./routes/filesRoutes";
import tasksRoutes from "./routes/tasksRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
//middlewares
app.use(apiKeyAuth);

initDb();

app.use("/messages", messageRoutes);
app.use("/resources", resourceRoutes);
app.use("/skills", skillRoutes);
app.use("/files", filesRoutes);
app.use("/tasks", tasksRoutes);

app.get("/", async (req: Request, res: Response) => {
  try {
    res.send(`👋 Hello World!`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while connecting to the database");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
