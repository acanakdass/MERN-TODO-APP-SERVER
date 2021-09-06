const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   name: {
      type: String,
      default: ''
   },
   desc: {
      type: String,
      default: ''
   },
   isCompleted: {
      type: Boolean,
      default: false
   },
   date: {
      type: Date
   }
});

mongoose.model('Todo', todoSchema)
