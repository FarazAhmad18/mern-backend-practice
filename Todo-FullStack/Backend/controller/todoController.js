const Todo = require('../model/todo');
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
exports.createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'text is required' });

    const todo = await Todo.create({ text });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {};
    if (req.body.text !== undefined) updates.text = req.body.text;
    if (req.body.done !== undefined) updates.done = req.body.done;

    const todo = await Todo.findByIdAndUpdate(id, updates, { new: true });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Todo not found' });

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
