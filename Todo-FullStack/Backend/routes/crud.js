const express = require('express');
const router = express.Router();
const ctrl = require('../controller/todoController');

router.get('/', ctrl.getTodos);
router.post('/', ctrl.createTodo);
router.patch('/:id', ctrl.updateTodo);
router.delete('/:id', ctrl.deleteTodo);

module.exports = router;
