const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');
require('../models/Todo');

const Todo = mongoose.model('Todo');

const router = express.Router();

router.use(requireAuth);

router.get('/todos', async (req, res) => {
   const todos = await Todo.find({ userId: req.user._id });

   res.send(todos);
});
router.get('/todos/:id', async (req, res) => {
   console.log(req.params.id);
   const todo = await Todo.find({ _id: req.params.id });
   res.send(todo)
   // etc ...
});
router.post('/todos', async (req, res) => {
   console.log('found a request');
   const { name, desc, isCompleted, date } = req.body;
   if (!name) {
      return res.status(422).send({ error: 'You must provide a name' });
   }
   try {
      const todo = new Todo({ name, desc, isCompleted, date, userId: req.user._id });
      await todo.save();
      res.send(todo);

   } catch (error) {
      return res.status(422).send({ error: error.message });
   }
})
// router.put('/todos/update/:id', async (req, res) => {
//    console.log('found an update request');
//    try {
//       const todo = Todo.findOneAndUpdate({ _id: req.params.id }, {
//          // name: req.body.name,
//          // desc: req.body.desc,
//          isCompleted: req.body.isCompleted,
//          // date: req.body.date
//          //The {new: true} option in the findByIdAndUpdate() method is used to return the modified document to the then() function instead of the original.
//       }, { new: true }).then(todo => {
//          if (!todo) {
//             return res.status(404).send({
//                message: "Todo not found with id " + req.params.id
//             });
//          }
//          res.send(todo)
//       })


//    } catch (error) {
//       return res.status(422).send({ error: error.message });
//    }
// })

router.put('/todos/update/:id', (req, res) => {
   console.log(req.body)
   Todo.findByIdAndUpdate({ _id: req.params.id }, { isCompleted: req.body.isCompleted }, { new: true })
      .then(updatedTodo => res.send(updatedTodo))
      .catch(err => {
         res.status(400).send("Error: " + err)
         console.log(err)
      })
})

module.exports = router;