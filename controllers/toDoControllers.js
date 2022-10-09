import ErrorHandler from "../middlewares/errorHandler.js";
import ToDo from "../model/ToDo.js";
import HttpStatus from "../common/httpStatus.js";
import HttpMessage from "../constants/httpMessages.js";

//GET -> /api/todos/
export const getAllToDos = async (req, res) => {
    if(!req.query.id){
        const allToDos = await ToDo.find();
        res.json({ allToDos });
    }
    else{
        const requiredTodo = await ToDo.findById(req.query.id);
        res.json({ requiredTodo });
    }

};

//POST -> /api/todos/
export const createToDo = async (req, res) => {
  const newTodo = await ToDo.create(req.body);

  res.status(201).json({
    newTodo,
  });
};

//Get -> /api/todos/:id/
export const getToDoById = async (req, res, next) => {
  try {
    const requiredTodo = await ToDo.findById(req.params.id);
    if (!requiredTodo)
      next({ status: HttpStatus.isNotFound, message: HttpMessage.isNotFound });
    else res.json({ requiredTodo });
  } catch (error) {
    next({ status: HttpStatus.isBadRequest, message: HttpMessage.isNotFound });
  }
};

//DELETE -> /api/todos/:id/
export const deleteToDoById = async (req, res, next) => {
  try {
    const deletedToDo = await ToDo.findByIdAndDelete(req.params.id);
    if (!deletedToDo) {
      next({ status: HttpStatus.isNotFound, message: HttpMessage.isNotFound });
    } else {
      res.json({ deletedToDoId: deletedToDo.id });
    }
  } catch (error) {
    next({ status: HttpStatus.isBadRequest, message: HttpMessage.isNotFound });
  }
};

//PATCH -> /api/todos/:id/
export const updateToDoById = async (req, res, next) => {
  try {
    const updatedToDo = await ToDo.findById(req.params.id);
    if (!updatedToDo) {
      next({ status: HttpStatus.isNotFound, message: HttpMessage.isNotFound });
    } else {
      updatedToDo.isCompleted = !updatedToDo.isCompleted;
      updatedToDo.save();
      res.json({ updatedToDo });
    }
  } catch (error) {
    next({ status: HttpStatus.isBadRequest, message: HttpMessage.isNotFound });
  }
};
