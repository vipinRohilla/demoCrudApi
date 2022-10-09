import express from 'express';
import { createToDo, deleteToDoById, getAllToDos, getToDoById, updateToDoById } from '../controllers/toDoControllers.js';

const router = express.Router();

// router.get('/:id', (req, res) => {
//     res.send(req.params.id);
// })


// router.get('/', (req, res) => {
//     res.send('hello world');
// })

router.route('/').get(getAllToDos).post(createToDo);

router.route('/:id').get(getToDoById).patch(updateToDoById).delete(deleteToDoById);


export default router;