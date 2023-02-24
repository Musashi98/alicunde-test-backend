import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as mongoose from "mongoose";
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();

const app: Express = express();

//Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const authorRoutes = require('./routers/AuthorRoutes')
const bookRoutes = require('./routers/BookRoutes')

app.use("/api/author", authorRoutes);
app.use("/api/book", bookRoutes);

// Url path not found
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "No se encuentra el recurso " + req.path, errorCode: -1 });
});

// General error in any controller
app.use((err: Error, req: Request, res: Response, next: Function) => {
  res.status(500).json({ message: err.message, errorCode: 0 });
});

const CONNECTION_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/backend-test";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
