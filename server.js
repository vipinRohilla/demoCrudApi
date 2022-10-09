import connectDB from "./config/connectDB.js";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import toDoRoutes from "./routes/toDoRoutes.js";
import Errorhandler from "./middlewares/errorHandler.js";

//DotENV Config
dotenv.config();

//Extracting the variables
const { PORT, NODE_ENV } = process.env;

//Async IIFE connect to the database
(async () => {
  await connectDB();

  //Express App Initialisation
  const app = express();

  //middlewares
  if (NODE_ENV === "development") app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  //forwarding routes to routes from /api/todos to the toDo controllers
  app.use("/api/todos", toDoRoutes); //primar route Hitter
  app.use(Errorhandler);

  //Listen for requests
  app.listen(5001, () => {
    console.log(
      `server up and running in ${NODE_ENV} mode, and is listening for requests on http://localhost:${PORT}/`
    );
  });
})();
